import React from 'react';
import common from '../../utils/common';

interface TodoCount {
    count: number;
}
function TodoCount({count}: TodoCount): JSX.Element {
    const activeTodoWord = common.pluralize(count, 'item');
    return (
        <span className="todo-count">
            <strong>{count}</strong>
            {activeTodoWord + ' left'}
        </span>
    );
}

export default TodoCount;
