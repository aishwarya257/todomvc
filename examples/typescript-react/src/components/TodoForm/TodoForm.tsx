import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import Input from 'components/Input/Input';
import Header from 'components/Header/Header';
import keyCodes from '../../constants/keyCodes';
import {separateBadgesAndTask} from './TodoForm.utils';
import {CommonProps, ITodo} from 'src/interfaces';
import useDocumentEvents from 'hooks/useDocumentEvents/useDocumentEvents';
import {TodosConstants, actionProps} from '../../hooks/useTodos/useTodos';
interface task {
    title: string;
    badges: Array<string>;
}

interface TodoFormProps extends CommonProps {
    taskDispatcher: Dispatch<SetStateAction<actionProps>>;
}

function TodoForm({children, taskDispatcher}: TodoFormProps): JSX.Element {
    const [task, setTask] = useState<string>('');
    const onChange = ({target}: React.ChangeEvent) => {
        setTask((target as HTMLInputElement).value);
    };
    const {clickedInside, ref} = useDocumentEvents(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [commit, setCommit] = useState(false);

    const commitTask = useCallback(() => {
        const text = task.trim();
        if (text.length) {
            const processedText = separateBadgesAndTask(text);
            if (processedText) {
                taskDispatcher({type: TodosConstants.ADD_TASK, payload: processedText});
                setTask('');
            }
        }
        setCommit(false);
    }, [task, taskDispatcher]);

    useEffect(() => {
        if (clickedInside === false) {
            setCommit(true);
        }
    }, [clickedInside, setCommit]);

    useEffect(() => {
        if (commit) {
            commitTask();
        }
    }, [commit, commitTask]);

    const onKeydown = ({key}: React.KeyboardEvent) => {
        ref.current = inputRef.current;
        if (key === keyCodes.ENTER) {
            setCommit(true);
        }
    };

    return (
        <header className="header">
            <Header>todos</Header>
            <Input
                ref={inputRef}
                value={task}
                className="new-todo"
                placeholder="What needs to be done?"
                onChange={onChange}
                onKeyDown={onKeydown}
                autoFocus={true}
            />
            {children}
        </header>
    );
}

export default TodoForm;
