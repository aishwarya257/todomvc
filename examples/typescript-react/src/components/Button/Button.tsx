import React, {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string | JSX.Element;
    className?: string;
    label?: string;
    onClick: (event: React.MouseEvent) => void;
}

function Button({children, label, ...otherProps}: ButtonProps): JSX.Element {
    return (
        <button {...otherProps} aria-label={label}>
            {' '}
            {children}{' '}
        </button>
    );
}

export default Button;
