import React from 'react';
import classNames from 'classnames';
import {useLocation, Link} from 'react-router-dom';
import {CommonProps} from 'src/interfaces';

interface FilterItemProps extends CommonProps {
    status: string;
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
