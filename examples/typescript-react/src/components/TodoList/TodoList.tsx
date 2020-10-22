import React from 'react';
import {CommonProps} from 'src/interfaces';

function TodoList({children}: CommonProps): JSX.Element {
    return <ul className="todo-list">{children}</ul>;
}

export default TodoList;
