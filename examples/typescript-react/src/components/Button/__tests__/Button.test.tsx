import React from 'react';
import Button from '../Button';

import {render} from '@testing-library/react';

describe('testing button component', () => {
    it('renders button component', () => {
        const {container} = render(<Button className="" onClick={() => {}} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
