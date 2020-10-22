import {useEffect, useReducer, Dispatch, SetStateAction} from 'react';
import useLocalStorage from '../useLocalStorage/useLocalStorage';
import {getUniqueId} from './useTodos.utils';
import {ITodo} from '../../interfaces';

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const REMOVE_COMPLETED = 'REMOVE_COMPLETED';
const TOGGLE_ALL_COMPLETED = 'TOGGLE_ALL_COMPLETED';

export const TodosConstants = {
    ADD_TASK,
    REMOVE_TASK,
    TOGGLE_TASK,
    UPDATE_TASK,
    REMOVE_COMPLETED,
    TOGGLE_ALL_COMPLETED
};

interface actionProps {
    type: string;
    payload?: ITodo;
}

const todosReducer = (todos, {type, payload}: actionProps) => {
    switch (type) {
        case ADD_TASK:
            return [...todos, {id: getUniqueId(), completed: false, ...payload}];
        case REMOVE_TASK:
            return todos.filter(({id}) => id !== payload.id);
        case REMOVE_COMPLETED:
            return todos.filter(({completed}) => !completed);
        case TOGGLE_ALL_COMPLETED:
            return todos.map((todo) => ({
                ...todo,
                completed: !todo.completed
            }));
        case TOGGLE_TASK:
        case UPDATE_TASK:
            console.log(payload);
            return todos.reduce(
                (finalList, todo) =>
                    todo.id === payload.id && payload.title?.length
                        ? [
                              ...finalList,
                              {
                                  ...todo,
                                  ...payload,
                                  completed:
                                      type === TOGGLE_TASK ? !todo.completed : payload.completed
                              }
                          ]
                        : [...finalList, ...todo],
                []
            );

        default:
            return todos;
    }
};
export default function useTodos(): [Array<ITodo>, Dispatch<SetStateAction<ITodo[]>>] {
    const [item, setItem] = useLocalStorage('react-todos');
    const [todos, todosDispatcher] = useReducer(todosReducer, (item && JSON.parse(item)) || []);
    useEffect(() => {
        setItem(JSON.stringify(todos));
    }, [todos, setItem]);
    return [todos, todosDispatcher];
}
