import React from 'react';

interface TodoListProps {
    children: JSX.Element | JSX.Element[];
}

function TodoList({children}: TodoListProps): JSX.Element {
    return <ul className="todo-list">{children}</ul>;
}

export default TodoList;
