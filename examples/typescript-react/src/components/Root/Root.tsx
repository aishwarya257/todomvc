import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import TodoList from '../TodoList/TodoList';
import TodoItem from '../TodoItem/TodoItem';
import TodoForm from '../TodoForm/TodoForm';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';

import {getFilteredTodos} from './Root.Utils';
import useTodos, {TodosConstants} from '../../hooks/useTodos/useTodos';
import {ITodo} from 'src/interfaces';

const {TOGGLE_ALL_COMPLETED, REMOVE_COMPLETED, ADD_TASK} = TodosConstants;

function Root(): JSX.Element {
    const [todos, setTodos] = useTodos();
    const {pathname} = useLocation();
    const filtered = getFilteredTodos(pathname.slice(1), todos);
    const [activeCount, setActiveCount] = useState<number>(0);
    const length = todos.length;
    useEffect(() => {
        setActiveCount(todos.reduce((sum, {completed}) => (completed ? sum : sum + 1), 0));
    }, [todos]);

    const updateTodoList = ({type, payload}) => {
        if (type && payload) {
            setTodos({type, payload});
        }
    };
    /** Used composition for this reason, instead of other approaches : https://kentcdodds.com/blog/application-state-management-with-react */
    return (
        <div>
            <TodoForm addTask={(description) => setTodos({type: ADD_TASK, payload: description})}>
                {length > 0 && (
                    <section className="main">
                        <Checkbox
                            label="Mark all as complete"
                            id="toggle-all"
                            className="toggle-all"
                            onChange={() => setTodos({type: TOGGLE_ALL_COMPLETED})}
                            checked={activeCount === 0}
                        />
                    </section>
                )}
            </TodoForm>
            <TodoList>
                {filtered.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} updateTodoList={updateTodoList} />
                ))}
            </TodoList>
            {length > 0 && (
                <Footer count={activeCount}>
                    {length - activeCount > 0 && (
                        <Button
                            className="clear-completed"
                            onClick={() => setTodos({type: REMOVE_COMPLETED})}
                        >
                            Clear completed
                        </Button>
                    )}
                </Footer>
            )}
        </div>
    );
}

export default Root;