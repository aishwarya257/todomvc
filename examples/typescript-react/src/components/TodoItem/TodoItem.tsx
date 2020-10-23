import React, {useEffect, useRef, useState, useCallback} from 'react';
import classNames from 'classnames';
import {ITodo} from '../../interfaces';

import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import TodoItemContent from 'components/TodoItemContent/TodoItemContent';
import EditingField from 'components/EditingField/EditingField';
import useDocumentEvents from 'hooks/useDocumentEvents/useDocumentEvents';
import useEditingField from 'hooks/useEditingField/useEditingField';
import useSlicedState from 'hooks/useSlicedState/useSlicedState';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {TodoActions, TodosConstants} from '../../hooks/useTodos/useTodos';

import task from '../../constants/task';
import keyCodes from '../../constants/keyCodes';

const {REMOVE_TASK, TOGGLE_TASK, UPDATE_TASK} = TodosConstants;

interface TodoItemProps {
    key: string;
    todo: ITodo;
    updateTodoList: (task: TodoActions) => void;
}

export default function TodoItem({todo, updateTodoList}: TodoItemProps): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);
    const [todoState, setTodoState] = useState<ITodo>(todo);
    const [updateCommit, setUpdateCommit] = useState<boolean>(false);

    const requiredKeys = useRef(task.editableFields);
    const currentLiRef = useRef<HTMLLIElement>(null);

    const slicedState = useSlicedState(todoState, requiredKeys.current);
    const {editFields, setEditFields, inputRefs, getValues} = useEditingField(slicedState);

    const commitTask = useCallback(() => {
        if (editing) {
            setTodoState((state) => ({
                ...state,
                ...getValues()
            }));
            setEditing(false);
        }
    }, [editing, getValues]);

    useDocumentEvents(currentLiRef, commitTask);

    const {completed, title} = todoState;

    const onChange = (e) => {
        const {
            target: {name, value}
        } = e;
        setEditFields((editFields) => ({
            ...editFields,
            [name]: value
        }));
    };

    useEffect(() => {
        setTodoState(todo);
    }, [todo]);

    useDeepCompareEffect(() => {
        setUpdateCommit(true);
    }, [todoState]);

    useEffect(() => {
        if (updateCommit) {
            updateTodoList({type: UPDATE_TASK, payload: todoState});
            setUpdateCommit(false);
        }
    }, [todoState, updateTodoList, updateCommit]);

    useEffect(() => {
        if (editing) {
            inputRefs.current[0]?.focus();
        }
    }, [editing, inputRefs]);

    const onKeyDown = (e) => {
        if (e.key === keyCodes.ENTER) {
            commitTask();
        } else if (e.key === keyCodes.ESCAPE) {
            setTodoState(todo);
            setEditing(false);
            setEditFields((state) => ({
                ...state,
                ...slicedState
            }));
        }
    };

    return (
        !!title.length && (
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
                        onChange={() => updateTodoList({type: TOGGLE_TASK, payload: todoState})}
                        labelProps={{onDoubleClick: () => setEditing(true)}}
                    />
                    <Button
                        className="destroy"
                        onClick={() => updateTodoList({type: REMOVE_TASK, payload: todoState})}
                    />
                </div>
                <EditingField
                    todoItem={editFields}
                    ref={inputRefs}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                />
            </li>
        )
    );
}
