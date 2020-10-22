import React from 'react';
import classNames from 'classnames';
import {useLocation, Link} from 'react-router-dom';
interface FilterItemProps {
    status: string;
    children: string | JSX.Element | JSX.Element[];
}
function FilterItem({status, children, ...otherProps}: FilterItemProps): JSX.Element {
    const {pathname} = useLocation();
    return (
        <li>
            <Link
                to={status}
                {...otherProps}
                className={classNames({selected: status === pathname.slice(1)})}
            >
                {children}
            </Link>
        </li>
    );
}

export default FilterItem;
