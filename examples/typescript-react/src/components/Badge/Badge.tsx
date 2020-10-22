import React from 'react';
import './Badge.css';

function Badge({children}) {
    return (
        <span className="badge" title={children}>
            {children}
        </span>
    );
}

export default Badge;
