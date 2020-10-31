import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TodosConstants} from 'hooks/useTodos/useTodos.types';
import React from 'react';
import common from '../../testUtils/common';
import TodoForm from './TodoForm';

const setup = (taskDispatcher = jest.fn(() => {})) => {
    const data = render(
        <TodoForm taskDispatcher={taskDispatcher}>
            <p>Test Child</p>
        </TodoForm>
    );
    return {...data};
};

const addTask = ({
    text,
    callback,
    shouldBeCalled = true
}: {
    text: string;
    callback?: (args) => void;
    shouldBeCalled?: boolean;
}) => {
    const taskDispatcher = common.mockSetTodos(TodosConstants.ADD_TASK, callback);
    setup(taskDispatcher);
    const input = screen.getByPlaceholderText('What needs to be done?');
    userEvent.type(input, text + '{enter}');
    expect(taskDispatcher).toHaveBeenCalledTimes(shouldBeCalled ? 1 : 0);
};

describe('Todoform Component', () => {
    it('Snapshot test', () => {
        const {container} = setup();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('Add simple task', () => {
        const text = 'I am new task';
        const callback = ({payload}) => {
            expect(payload.title).toBe(text);
            expect(payload.badges).toStrictEqual([]);
        };
        addTask({text, callback});
    });

    it('Add task with badges', () => {
        const title = 'I am new task';
        const text = title + ' @learn @javascript';
        const callback = ({payload}) => {
            expect(payload.title).toBe(title);
            expect(payload.badges).toStrictEqual(['learn', 'javascript']);
        };
        addTask({text, callback});
    });

    it('Add empty text', () => {
        const text = '         ';
        addTask({text, shouldBeCalled: false});
    });

    it('Add title with duplicate badges', () => {
        const title = 'I am new task';
        const text = title + ' @duplicate @duplicate @duplicate';
        const callback = ({payload}) => {
            expect(payload.title).toBe(title);
            expect(payload.badges).toStrictEqual(['duplicate']);
        };
        addTask({text, callback});
    });

    it('Add title with empty badge', () => {
        const title = 'I am new task';
        const text = title + ' @';
        const callback = ({payload}) => {
            expect(payload.title).toBe(title);
            expect(payload.badges).toStrictEqual([]);
        };
        addTask({text, callback});
    });
});
