import React, {useEffect, useRef, useState, KeyboardEvent, ChangeEvent} from 'react';
import classNames from 'classnames';
import {ITodo, Keys} from '../../interfaces';

import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import TodoItemContent from 'components/TodoItemContent/TodoItemContent';
import EditingField from 'components/EditingField/EditingField';
import useDocumentEvents from 'hooks/useDocumentEvents/useDocumentEvents';
import useEditingField from 'hooks/useEditingField/useEditingField';
import useSlicedState from 'hooks/useSlicedState/useSlicedState';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {ActionsWithPayload, TodoActions, TodosConstants} from '../../hooks/useTodos/useTodos.types';

import task from '../../constants/task';
import keyCodes from '../../constants/keyCodes';
import taskConstants from '../../constants/task';

const {REMOVE_TASK, TOGGLE_TASK, UPDATE_TASK} = TodosConstants;

interface TodoItemProps {
    key: string;
    todo: ITodo;
    setTodos: (task: TodoActions) => void;
}

export default function TodoItem({todo, setTodos}: TodoItemProps): JSX.Element | null {
    const [editing, setEditing] = useState<boolean>(false);
    const [todoState, setTodoState] = useState<ITodo>(todo);

    const requiredKeys = useRef(task.editableFields);
    const currentLiRef = useRef<HTMLLIElement>(null);
    const slicedState = useSlicedState(todoState, requiredKeys.current);
    const {editFields, setEditFields, inputRefs, getValues} = useEditingField(slicedState);
    const commit = useRef(false);

    const updateTodoList = (action: ActionsWithPayload) => {
        if (commit.current) {
            const {payload} = action;
            if (!payload.title.length) {
                setTodos({type: REMOVE_TASK, payload});
            } else {
                setTodos(action);
            }
            commit.current = false;
        }
    };

    const commitTask = () => {
        if (editing) {
            setTodoState((state) => ({
                ...state,
                ...getValues()
            }));
            setEditing(false);
            commit.current = true;
        }
    };

    useDocumentEvents(currentLiRef, commitTask);

    const {completed, title} = todoState;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        const delimiter = taskConstants.editDelimiter[name as Keys];
        setEditFields((editFields) => ({
            ...editFields,
            [name]: delimiter ? value.split(delimiter) : value
        }));
    };

    useEffect(() => {
        setTodoState(todo);
    }, [todo]);

    useDeepCompareEffect(() => {
        updateTodoList({type: UPDATE_TASK, payload: todoState}), [todoState];
    });

    useEffect(() => {
        if (editing) {
            inputRefs.current[0]?.focus();
        }
    }, [editing, inputRefs]);

    const onKeyDown = (e: KeyboardEvent) => {
        const key = e.key;
        if (key === keyCodes.ENTER) {
            commitTask();
        } else if (key === keyCodes.ESCAPE) {
            setTodoState(todo);
            setEditing(false);
            setEditFields((state) => ({
                ...state,
                ...slicedState
            }));
        }
    };

    return !!title.length ? (
        <li
            ref={currentLiRef}
            className={classNames({
                completed,
                editing
            })}
            onKeyDown={onKeyDown}
        >
            <div className="view">
                <Checkbox
                    className="toggle"
                    checked={completed}
                    label={<TodoItemContent {...todoState} />}
                    onChange={() => {
                        commit.current = true;
                        updateTodoList({type: TOGGLE_TASK, payload: todoState});
                    }}
                    labelProps={{onDoubleClick: () => setEditing(true)}}
                />
                <Button
                    className="destroy"
                    label="remove"
                    onClick={() => {
                        commit.current = true;
                        updateTodoList({type: REMOVE_TASK, payload: todoState});
                    }}
                />
            </div>
            {editing && (
                <EditingField
                    todoItem={editFields}
                    ref={inputRefs}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                />
            )}
        </li>
    ) : null;
}
