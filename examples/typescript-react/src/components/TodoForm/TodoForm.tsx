import React, {useState} from 'react';
import Input from 'components/Input/Input';
import Header from 'components/Header/Header';
import Label from 'components/Label/Label';
import keyCodes from 'src/constants/keyCodes';
interface TodoFormProps {
    showCheckbox?: boolean;
    checked?: boolean;
    children?: JSX.Element[] | JSX.Element;
}
function TodoForm({showCheckbox, checked, children}: TodoFormProps): JSX.Element {
    const [task, setTask] = useState('');
    const onChange = ({target}: React.ChangeEvent) => setTask((target as HTMLInputElement).value);
    const onKeydown = ({key}: React.KeyboardEvent) => {
        if (key === keyCodes.ENTER) {
            console.log(task);
        }
    };
    const toggleAll = (e) => {};
    return (
        <>
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
                {showCheckbox && (
                    <section className="main">
                        <Input
                            className="toggle-all"
                            type="checkbox"
                            onChange={toggleAll}
                            checked={checked}
                        />
                        <Label htmlFor="toggle-all">Mark all as complete</Label>
                    </section>
                )}
            </header>
            {children}
        </>
    );
}

export default TodoForm;
