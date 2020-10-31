import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Root from './Root';
import {renderWithRouter} from '../../setUpTests';

const setup = (path = '/') => {
    const testData = [
        {
            id: 1,
            completed: false,
            title: 'Title 1',
            badges: ['Hey']
        },
        {
            id: 2,
            completed: true,
            title: 'Title 2',
            badges: ['Hi']
        }
    ];
    window.localStorage.setItem('react-todos', JSON.stringify(testData));
    const data = renderWithRouter(<Root />, {route: path});
    return {
        testData,
        ...data
    };
};

const runActiveTest = (testData) => {
    expect(screen.queryByText(testData[1].title)).not.toBeInTheDocument();
    expect(screen.queryByText(testData[0].title)).toBeInTheDocument();
};

const runCompletedTest = (testData) => {
    expect(screen.queryByText(testData[1].title)).toBeInTheDocument();
    expect(screen.queryByText(testData[0].title)).not.toBeInTheDocument();
};

const runAllTest = (testData) => {
    expect(screen.queryByText(testData[1].title)).toBeInTheDocument();
    expect(screen.queryByText(testData[0].title)).toBeInTheDocument();
};

const buttonClickTest = ({name, fn}) => {
    const {testData} = setup('/');
    runAllTest(testData);
    const activeButton = screen.getByText(name);
    userEvent.click(activeButton);
    fn(testData);
};

describe('test Root component', () => {
    it('Snapshot test', () => {
        const {container} = setup('/');
        expect(container.firstChild).toMatchSnapshot();
    });
    it('Change from show all to active', () => {
        const {testData} = setup('/active');
        runActiveTest(testData);
    });
    it('change from active to completed', () => {
        const {testData} = setup('/completed');
        runCompletedTest(testData);
    });

    it('Testing Active button', () => buttonClickTest({name: 'Active', fn: runActiveTest}));

    it('Testing Completed Button', () =>
        buttonClickTest({name: 'Completed', fn: runCompletedTest}));

    it('Testing All Button', () => buttonClickTest({name: 'All', fn: runAllTest}));

    it('Mark all complete', () => {
        setup();
        const checkbox = screen.getByLabelText('Mark all as complete');
        expect(
            screen.getByText((content, node) => node.textContent === '1 item left')
        ).toBeInTheDocument();
        userEvent.click(checkbox);
        expect(
            screen.getByText((content, node) => node.textContent === '0 left')
        ).toBeInTheDocument();
    });

    it('Clear completed', () => {
        const {testData} = setup();
        const clearCompletedButton = screen.getByText(/Clear Completed/i);
        userEvent.click(clearCompletedButton);
        runActiveTest(testData);
    });
});
