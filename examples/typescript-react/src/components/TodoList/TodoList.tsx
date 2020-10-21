import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

interface TodoList {
    items: Array<ITodo>;
}

function TodoList({items}: TodoList): JSX.Element {
    return (
        <ul className="todo-list">
            {items.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => {
                        return null;
                    }}
                    onDestroy={() => {
                        return null;
                    }}
                    onEdit={() => {
                        return null;
                    }}
                    editing={false}
                    onSave={() => {
                        return null;
                    }}
                    onCancel={() => {
                        return null;
                    }}
                />
            ))}
        </ul>
    );
}

export default TodoList;
