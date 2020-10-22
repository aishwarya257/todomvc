import React from 'react';
import Input, {InputProps} from '../Input/Input';
import Label from '../Label/Label';

interface CheckboxProps extends InputProps {
    label: string | JSX.Element | JSX.Element[];
    labelProps?: any;
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
