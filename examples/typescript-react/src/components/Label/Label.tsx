import React from 'react';

interface LabelProps {
    children: JSX.Element[] | JSX.Element | string;
    htmlFor: string;
}
const Label: React.FC<LabelProps> = ({children, ...otherProps}) => {
    return <label {...otherProps}>{children}</label>;
};

export default Label;
