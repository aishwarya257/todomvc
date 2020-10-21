import React from 'react';

interface FilterItemProps {
    status: string;
    className: string;
    children: string | JSX.Element | JSX.Element[];
}
function FilterItem({status, children, ...otherProps}: FilterItemProps): JSX.Element {
    return (
        <li>
            <a href={`#/${status}`} {...otherProps}>
                {children}
            </a>
        </li>
    );
}

export default FilterItem;
