import React from 'react';

interface ButtonProps {
    children?: string | JSX.Element;
    className: string;
    onClick: (event: React.MouseEvent) => void;
}

function Button({children, ...otherProps}: ButtonProps): JSX.Element {
    return <button {...otherProps}> {children} </button>;
}

export default Button;
