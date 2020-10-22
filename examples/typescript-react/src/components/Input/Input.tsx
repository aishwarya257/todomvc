import React, {forwardRef, InputHTMLAttributes} from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <input {...props} ref={ref} />
));

Input.displayName = 'Input';

export default Input;
