import React from 'react';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';
import {
    setup,
    modifyTextInEditMode,
    getArray,
    openEditMode,
    checkTextCommit,
    getHeading
} from './TodoItem.testUtils';

import common from '../../../testUtils/common';
import {TodosConstants} from 'hooks/useTodos/useTodos.types';

describe('test TodoItem  component', () => {
    it('Snapshot test', () => {
        const {container} = setup();
        expect(container.firstChild).toMatchSnapshot();
    });
    it('Toggle checkbox status', () => {
        let updatedTodo;

        const setFunction = jest.fn(() => {
            updatedTodo = {...item, completed: true};
            return {};
        });
        const {rerender, item} = setup(setFunction);
        userEvent.click(screen.getByRole('checkbox'));
        expect(setFunction).toHaveBeenCalledTimes(1);
        rerender(<TodoItem todo={updatedTodo} setTodos={setFunction} key="1" />);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });
    it('Open edit field', () => {
        const {
            item: {title, badges},
            textboxes
        } = openEditMode();
        getArray(textboxes).forEach((textbox) => expect(textbox).toBeInTheDocument());
        expect(textboxes.length).toBe(2);
        expect(screen.getByText(getHeading(title, badges))).toBeInTheDocument();
    });
    it('Change text content', () => {
        modifyTextInEditMode();
    });
    it('Commit Value', () => {
        let updatedTodo;
        const setTodosCallback = () => {
            updatedTodo = {
                ...item
            };
        };
        const newSetTodos = common.mockSetTodos(TodosConstants.UPDATE_TASK, setTodosCallback);
        const {textboxes, item, rerender} = modifyTextInEditMode({setTodos: newSetTodos});
        userEvent.type(textboxes[0], '{enter}');
        expect(textboxes[0]).not.toBeInTheDocument();
        expect(newSetTodos).toHaveBeenCalledTimes(1);
        rerender(<TodoItem todo={updatedTodo} setTodos={newSetTodos} key="1" />);
        checkTextCommit(item);
    });

    it('Revert Value', () => {
        const newSetTodos = jest.fn(() => {});
        const {textboxes, oldItem} = modifyTextInEditMode({setTodos: newSetTodos});
        userEvent.type(textboxes[0], '{esc}');
        expect(textboxes[0]).not.toBeInTheDocument();
        expect(newSetTodos).toHaveBeenCalledTimes(0);
        checkTextCommit(oldItem);
    });

    it('Without title', () => {
        const newSetTodos = common.mockSetTodos(TodosConstants.REMOVE_TASK);
        const {textboxes} = modifyTextInEditMode({
            setTodos: newSetTodos,
            newData: {title: '', badges: ['one']},
            props: {
                clearText: true
            }
        });
        userEvent.type(textboxes[0], '{enter}');
        expect(textboxes[0]).not.toBeInTheDocument();
        expect(newSetTodos).toHaveBeenCalledTimes(1);
    });

    it('Remove item by clicking remove icon', () => {
        const newSetTodos = common.mockSetTodos(TodosConstants.REMOVE_TASK);
        const {setTodos} = setup(newSetTodos);
        const removeIcon = screen.getByRole('button', {name: 'remove'});
        userEvent.click(removeIcon);
        expect(setTodos).toHaveBeenCalledTimes(1);
    });

    it('Toggle task complete', () => {
        const newSetTodos = common.mockSetTodos(TodosConstants.TOGGLE_TASK);
        const {setTodos} = setup(newSetTodos);
        const checkIcon = screen.getByRole('checkbox');
        userEvent.click(checkIcon);
        expect(setTodos).toHaveBeenCalledTimes(1);
        userEvent.click(checkIcon);
        expect(setTodos).toHaveBeenCalledTimes(2);
    });
});
