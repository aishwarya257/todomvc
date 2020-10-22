import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {ITodo} from '../../interfaces';

import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import TodoItemContent from 'components/TodoItemContent/TodoItemContent';
import EditingField from 'components/EditingField/EditingField';
import useDocumentEvents from 'hooks/useDocumentEvents/useDocumentEvents';
import useEditingField from 'hooks/useEditingField/useEditingField';
import useSlicedState from 'hooks/useSlicedState/useSlicedState';
import {TodosConstants} from '../../hooks/useTodos/useTodos';

import task from '../../constants/task';
import keyCodes from '../../constants/keyCodes';

const {REMOVE_TASK, TOGGLE_TASK, UPDATE_TASK} = TodosConstants;

interface TodoItemProps {
    key: string;
    todo: ITodo;
    updateTodoList: (task: {type: string; payload: ITodo}) => void;
}

export default function TodoItem({todo, updateTodoList}: TodoItemProps): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);
    const [todoState, setTodoState] = useState<ITodo>(todo);
    const [updateCommit, setUpdateCommit] = useState<boolean>(false);

    const requiredKeys = useRef(task.editableFields);
    const currentLiRef = useRef<HTMLLIElement>(null);

    const slicedState = useSlicedState(todoState, requiredKeys.current);
    const {editFields, setEditFields, inputRefs, getValues} = useEditingField(slicedState);
    const {ref, setClickedInside, clickedInside, isEscape} = useDocumentEvents(null);

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

    useEffect(() => {
        if (updateCommit) {
            updateTodoList({type: UPDATE_TASK, payload: todoState});
            setUpdateCommit(false);
        }
    }, [todoState, updateTodoList, updateCommit]);

    useEffect(() => {
        if (isEscape) {
            setEditFields((state) => ({
                ...state,
                ...slicedState
            }));
        }
    }, [isEscape, slicedState, setEditFields]);

    const commitTask = useRef(() => {
        setTodoState((state) => ({
            ...state,
            ...getValues()
        }));
        setUpdateCommit(true);
        setEditing(false);
    });

    useEffect(() => {
        if (clickedInside === false) {
            if (!isEscape) {
                commitTask?.current();
            }
            setEditing(false);
        }
    }, [clickedInside, isEscape]);

    useEffect(() => {
        if (editing) {
            inputRefs.current[0]?.focus();
            editing !== clickedInside && setClickedInside(editing);
        }
    }, [editing, inputRefs, clickedInside, setClickedInside]);

    const onKeyDown = (e) => {
        if (e.key === keyCodes.ENTER) {
            commitTask?.current();
        }
    };

    const onMouseDown = () => (ref.current = currentLiRef.current);

    return (
        !!title.length && (
            <li
                ref={currentLiRef}
                className={classNames({
                    completed,
                    editing
                })}
                onMouseDown={onMouseDown}
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
