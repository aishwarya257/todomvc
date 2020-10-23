import {useEffect, useReducer, Dispatch, SetStateAction} from 'react';
import useLocalStorage from '../useLocalStorage/useLocalStorage';
import {getUniqueId} from './useTodos.utils';
import {ITodo} from '../../interfaces';

export enum TodosConstants {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    REMOVE_COMPLETED = 'REMOVE_COMPLETED',
    TOGGLE_ALL_COMPLETED = 'TOGGLE_ALL_COMPLETED'
}

export interface AddType {
    title: string;
    badges: Array<string>;
}

type ActionMap<M extends {[index: string]: any}> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

type WithoutPayloadProps = {
    [TodosConstants.REMOVE_COMPLETED]: undefined;
    [TodosConstants.TOGGLE_ALL_COMPLETED]: undefined;
};

type PayloadProps = {
    [TodosConstants.ADD_TASK]: AddType;
    [TodosConstants.REMOVE_TASK]: ITodo;
    [TodosConstants.TOGGLE_TASK]: ITodo;
    [TodosConstants.UPDATE_TASK]: ITodo;
};

export type ActionsWithoutPayload = ActionMap<WithoutPayloadProps>[keyof ActionMap<
    WithoutPayloadProps
>];

export type ActionsWithPayload = ActionMap<PayloadProps>[keyof ActionMap<PayloadProps>];

export type TodoActions = ActionsWithPayload | ActionsWithoutPayload;

const todosReducer = (todos, task: TodoActions) => {
    switch (task.type) {
        case TodosConstants.ADD_TASK:
            return [...todos, {id: getUniqueId(), completed: false, ...task.payload}];
        case TodosConstants.REMOVE_TASK:
            return todos.filter(({id}) => id !== task.payload.id);
        case TodosConstants.REMOVE_COMPLETED:
            return todos.filter(({completed}) => !completed);
        case TodosConstants.TOGGLE_ALL_COMPLETED:
            const completed = todos[0].completed;
            return todos.map((todo) => ({
                ...todo,
                completed: !completed
            }));
        case TodosConstants.TOGGLE_TASK:
        case TodosConstants.UPDATE_TASK:
            const {payload, type} = task;
            return todos.reduce(
                (finalList, todo) =>
                    todo.id === payload.id && payload.title?.length
                        ? [
                              ...finalList,
                              {
                                  ...todo,
                                  ...payload,
                                  completed:
                                      type === TodosConstants.TOGGLE_TASK
                                          ? !todo.completed
                                          : payload.completed
                              }
                          ]
                        : [...finalList, ...todo],
                []
            );

        default:
            return todos;
    }
};
export default function useTodos(): [Array<ITodo>, Dispatch<SetStateAction<TodoActions>>] {
    const [item, setItem] = useLocalStorage('react-todos');
    const [todos, todosDispatcher] = useReducer(todosReducer, (item && JSON.parse(item)) || []);
    useEffect(() => {
        setItem(JSON.stringify(todos));
    }, [todos, setItem]);
    return [todos, todosDispatcher];
}
