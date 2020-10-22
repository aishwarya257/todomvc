import React, {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string | JSX.Element;
    className: string;
    onClick: (event: React.MouseEvent) => void;
}

function Button({children, ...otherProps}: ButtonProps): JSX.Element {
    return <button {...otherProps}> {children} </button>;
}

export default Button;
