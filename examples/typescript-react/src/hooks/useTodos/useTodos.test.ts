import {ITodo, Keys, SlicedStateProps} from '../../interfaces';
import {renderHook, act} from '@testing-library/react-hooks';
import useTodos from './useTodos';
import {Dispatch} from 'react';
import {TodosConstants, TodoActions} from './useTodos.types';

const addTodo = (setTodos: Dispatch<TodoActions>) => {
    const payload: SlicedStateProps = {title: 'Cool', badges: ['i', 'dont']};
    act(() => {
        setTodos({
            type: TodosConstants.ADD_TASK,
            payload
        });
    });
    return payload;
};

const checkLength = (todos: Array<ITodo>, length: number) => {
    act(() => {
        expect(todos.length).toBe(length);
    });
};

const setup = (localStorageId: string) => {
    const {result} = renderHook(() => useTodos(localStorageId));
    return result;
};

const checkCompleted = (todos: Array<ITodo>, value: boolean) => {
    act(() => {
        todos.forEach((todo) => expect(todo.completed).toBe(value));
    });
};

describe('test useTodos', () => {
    it('is ADD_TASK', () => {
        const result = setup('add-test-id');
        let [todos, setTodos] = result.current;
        checkLength(todos, 0);
        addTodo(setTodos);
        const payload = addTodo(setTodos);
        [todos, setTodos] = result.current;
        act(() => {
            expect(todos.length).toBe(2);
            todos.forEach((todo: ITodo) => {
                Object.keys(payload).forEach((key) =>
                    expect(todo[key as Keys]).toStrictEqual(payload[key as Keys])
                );
                expect(todo.completed).toBe(false);
            });
        });
    });

    it('is REMOVE_TASK', () => {
        const result = setup('add-test-id');
        let [todos, setTodos] = result.current;
        checkLength(todos, 2);
        [todos, setTodos] = result.current;
        act(() => {
            setTodos({type: TodosConstants.REMOVE_TASK, payload: todos[0]});
        });
        checkLength(result.current[0], 1);
    });
    it('is TOGGLE_TASK', () => {
        const result = setup('add-test-id');
        let [todos, setTodos] = result.current;
        checkLength(todos, 1);
        [todos, setTodos] = result.current;
        const payload = todos[0];
        act(() => {
            setTodos({type: TodosConstants.TOGGLE_TASK, payload});
        });
        const firstTodo = result.current[0][0];
        expect(firstTodo.completed).toBe(!payload.completed);
    });

    it('is  TOGGLE_ALL_COMPLETED', () => {
        const result = setup('toggle-all-test-id');
        let [todos, setTodos] = result.current;
        checkLength(todos, 0);
        addTodo(setTodos);
        addTodo(setTodos);
        [todos, setTodos] = result.current;
        checkLength(todos, 2);
        checkCompleted(todos, false);
        act(() => {
            setTodos({type: TodosConstants.TOGGLE_ALL_COMPLETED});
        });
        checkCompleted(result.current[0], true);
    });
    it('is TOGGLE_ALL_COMPLETED', () => {
        const result = setup('toggle-all-test-id');
        const [todos, setTodos] = result.current;
        checkLength(todos, 2);
        act(() => {
            setTodos({type: TodosConstants.REMOVE_COMPLETED});
        });
        checkLength(result.current[0], 0);
    });
});
