import React from 'react';
import Badges from 'components/Badges/Badges';
import Badge from 'components/Badge/Badge';

function TodoItemContent({title, badges}) {
    return (
        <>
            <span> {title} </span>
            {badges ? (
                <Badges>
                    {badges.map((value) => !!value.length && <Badge key={value}> {value}</Badge>)}
                </Badges>
            ) : null}
        </>
    );
}

export default TodoItemContent;
