import React from 'react';
import {CommonProps} from 'src/interfaces';

function Header({children}: CommonProps): JSX.Element {
    return <h1>{children}</h1>;
}

export default Header;
