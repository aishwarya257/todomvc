import React from 'react';
import {Utils} from '../utils';

interface TodoCount {
    count: number;
}
function TodoCount({count}: TodoCount): JSX.Element {
    const activeTodoWord = Utils.pluralize(count, 'item');
    return (
        <span className="todo-count">
            <strong>{count}</strong> {activeTodoWord + ' left'}
        </span>
    );
}

export default TodoCount;
