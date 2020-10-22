import Button from 'components/Button/Button';
import Filters from 'components/Filters/Filters';
import TodoCount from 'components/TodoCount/TodoCount';
import * as React from 'react';

interface ITodoFooterProps {
    count: number;
    children: JSX.Element;
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
