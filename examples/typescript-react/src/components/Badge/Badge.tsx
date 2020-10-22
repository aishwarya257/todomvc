import React from 'react';
import './Badge.css';
import {CommonProps} from '../../interfaces';

interface BadgeProps extends CommonProps {
    title: string;
}

function Badge({children, title}: BadgeProps): JSX.Element {
    return (
        <span className="badge" title={title}>
            {children}
        </span>
    );
}

export default Badge;
