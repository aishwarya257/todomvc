import React, {InputHTMLAttributes} from 'react';
import Input from '../Input/Input';
import Label from '../Label/Label';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: JSX.Element[] | JSX.Element | string;
    labelProps?: {
        onDoubleClick: () => void;
    };
}

function Checkbox({
    className,
    label,
    labelProps,
    id,
    checked = false,
    ...otherProps
}: CheckboxProps): JSX.Element {
    return (
        <>
            <Input
                className={className}
                type="checkbox"
                id={id}
                {...otherProps}
                checked={checked}
            />
            <Label htmlFor={id} {...labelProps}>
                {label}
            </Label>
        </>
    );
}

export default Checkbox;
