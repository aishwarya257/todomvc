import React, {useCallback, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import Button from 'components/Button/Button';

import Checkbox from 'components/Checkbox/Checkbox';
import TodoItemContent from 'components/TodoItemContent/TodoItemContent';
import EditingField from 'components/EditingField/EditingField';
import useOutsideClick from 'src/hooks/useOutsideClick/useOutsideClick';
import useEditingField from 'src/hooks/useEditingField/useEditingField';
import useSlicedState from 'src/hooks/useSlicedState/useSlicedState';
import task from 'src/constants/task';
import {TodosConstants} from '../../hooks/useTodos/useTodos';
import keyCodes from 'src/constants/keyCodes';

const {REMOVE_TASK, TOGGLE_TASK, UPDATE_TASK} = TodosConstants;

interface TodoItemProps {
    key: string;
    todo: ITodo;
    updateTodoList: (task: {type: string; payload: ITodo}) => void;
}
export default function TodoItem({todo, updateTodoList}: TodoItemProps): JSX.Element {
    const [editing, setEditing] = useState(false);
    const [todoState, setTodoState] = useState(todo);
    const {completed, title} = todoState;
    const requiredKeys = useRef(task.editableFields);
    const slicedState = useSlicedState(todoState, requiredKeys.current);
    const [updateCommit, setUpdateCommit] = useState(false);
    const {editFields, setEditFields, inputRefs, getValues} = useEditingField(slicedState);
    const {ref, isComponentVisible, setIsComponentVisible, isEscape} = useOutsideClick(null);
    const currentLiRef = useRef(null);
    const onChange = ({target: {name, value}}) => {
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
    });

    useEffect(() => {
        if (isComponentVisible === false) {
            if (!isEscape) {
                commitTask?.current();
            }
            setEditing(false);
        }
    }, [isComponentVisible, isEscape]);

    useEffect(() => {
        if (editing) {
            inputRefs.current[0]?.current.focus();
            editing !== isComponentVisible && setIsComponentVisible(editing);
        }
    }, [editing, inputRefs, isComponentVisible, setIsComponentVisible]);

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
