import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import Input from 'components/Input/Input';
import Header from 'components/Header/Header';
import keyCodes from '../../constants/keyCodes';
import {separateBadgesAndTask} from './TodoForm.utils';
import {CommonProps} from 'src/interfaces';
import useDocumentEvents from 'hooks/useDocumentEvents/useDocumentEvents';
import {TodosConstants, AddPropsPayLoad} from '../../hooks/useTodos/useTodos.types';

interface TodoFormProps extends CommonProps {
    taskDispatcher: Dispatch<AddPropsPayLoad>;
}

function TodoForm({children, taskDispatcher}: TodoFormProps): JSX.Element {
    const [task, setTask] = useState<string>('');

    const onChange = ({target}: React.ChangeEvent) => {
        setTask((target as HTMLInputElement).value);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const commitTask = () => {
        const text = task.trim();
        if (text.length) {
            const processedText = separateBadgesAndTask(text);
            if (processedText) {
                taskDispatcher({
                    type: TodosConstants.ADD_TASK,
                    payload: processedText
                });
                setTask('');
            }
        }
    };

    useDocumentEvents(inputRef, commitTask);

    const onKeydown = ({key}: React.KeyboardEvent) => {
        if (key === keyCodes.ENTER) {
            commitTask();
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
