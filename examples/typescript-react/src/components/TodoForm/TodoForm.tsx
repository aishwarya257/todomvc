import React, {useState} from 'react';
import Input from 'components/Input/Input';
import Header from 'components/Header/Header';
import keyCodes from '../../constants/keyCodes';
import {separateBadgesAndTask} from './TodoForm.utils';

interface task {
    title: string;
    badges: Array<string>;
}

interface TodoFormProps {
    children?: JSX.Element[] | JSX.Element;
    addTask: (task: task) => void;
}

function TodoForm({children, addTask}: TodoFormProps): JSX.Element {
    const [task, setTask] = useState('');
    const onChange = ({target}: React.ChangeEvent) => setTask((target as HTMLInputElement).value);
    const onKeydown = ({key}: React.KeyboardEvent) => {
        const text = task.trim();
        if (text.length && key === keyCodes.ENTER) {
            const processedText = separateBadgesAndTask(text);
            if (processedText) {
                addTask(processedText);
                setTask('');
            }
        }
    };
    return (
        <header className="header">
            <Header>todos</Header>
            <Input
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
