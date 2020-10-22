import React, {LabelHTMLAttributes} from 'react';
import {CommonProps} from 'src/interfaces';

interface LabelProps extends CommonProps, Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {}

function Label({children, ...otherProps}: LabelProps): JSX.Element {
    return <label {...otherProps}>{children}</label>;
}

export default Label;
