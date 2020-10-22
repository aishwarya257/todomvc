import React from 'react';
import Badges from 'components/Badges/Badges';
import Badge from 'components/Badge/Badge';

interface TodoItemContentProps {
    title: string | JSX.Element | JSX.Element[];
    badges: Array<string>;
}

function TodoItemContent({title, badges}: TodoItemContentProps): JSX.Element {
    return (
        <>
            <span> {title} </span>
            {badges ? (
                <Badges>
                    {badges.map(
                        (value) =>
                            !!value.length && (
                                <Badge key={value} title={value}>
                                    {value}
                                </Badge>
                            )
                    )}
                </Badges>
            ) : null}
        </>
    );
}

export default TodoItemContent;
