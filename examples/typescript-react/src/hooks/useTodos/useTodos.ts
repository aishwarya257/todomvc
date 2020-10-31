import {useEffect, useReducer, Dispatch} from 'react';
import useLocalStorage from '../useLocalStorage/useLocalStorage';
import {getUniqueId} from './useTodos.utils';
import {ITodo} from '../../interfaces';
import {TodoActions, TodosConstants} from './useTodos.types';

const todosReducer = (todos: Array<ITodo>, task: TodoActions): ITodo[] => {
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
                (finalList: ITodo[], todo) =>
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
                        : [...finalList, {...todo}],
                []
            );

        default:
            return todos;
    }
};

export default function useTodos(
    localStorageId = 'react-todos'
): [Array<ITodo>, Dispatch<TodoActions>] {
    const [item, setItem] = useLocalStorage(localStorageId);
    const initialState = (item ? JSON.parse(item) : null) || [];
    const [todos, todosDispatcher] = useReducer(todosReducer, initialState);
    useEffect(() => {
        setItem(JSON.stringify(todos));
    }, [todos, setItem]);
    return [todos, todosDispatcher];
}
