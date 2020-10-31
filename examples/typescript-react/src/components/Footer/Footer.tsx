import Button from 'components/Button/Button';
import Filters from 'components/Filters/Filters';
import TodoCount from 'components/TodoCount/TodoCount';
import React from 'react';
import {CommonProps} from 'src/interfaces';

interface ITodoFooterProps extends CommonProps {
    count: number;
}

export default function Footer({count, children}: ITodoFooterProps): JSX.Element {
    return (
        <footer className="footer">
            <TodoCount count={count} />
            <Filters />
            {children}
        </footer>
    );
}
