import React, {forwardRef} from 'react';

export interface InputProps {
    className?: string;
    value?: string;
    id?: string;
    name?: string;
    checked?: boolean;
    type?: string;
    autoFocus?: boolean;
    placeholder?: string;
    ref?: any;
    onClick?: (event: React.MouseEvent) => void;
    onChange?: (event: React.ChangeEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

const Input = forwardRef(
    (props: InputProps, ref): JSX.Element => {
        return <input {...props} ref={ref} />;
    }
);

Input.displayName = 'Input';

export default Input;
