import React from 'react';
interface InputProps {
    className?: string;
    value?: string;
    checked?: boolean;
    type?: string;
    autoFocus?: boolean;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}
function Input(props: InputProps): JSX.Element {
    return <input {...props} />;
}

export default Input;
