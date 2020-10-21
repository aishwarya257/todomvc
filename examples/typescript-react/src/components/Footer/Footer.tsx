/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

import Button from 'components/Button/Button';
import Filters from 'components/Filters/Filters';
import TodoCount from 'components/TodoCount/TodoCount';
import * as React from 'react';

interface ITodoFooterProps {
    completedCount: number;
    onClearCompleted: any;
    nowShowing: string;
    count: number;
}

export default function Footer({
    onClearCompleted,
    count,
    nowShowing,
    completedCount
}: ITodoFooterProps): JSX.Element {
    return (
        <footer className="footer">
            <TodoCount count={count} />
            <Filters selected={nowShowing} />
            {completedCount > 0 && (
                <Button className="clear-completed" onClick={onClearCompleted}>
                    Clear completed
                </Button>
            )}
        </footer>
    );
}
