import React from 'react';
import {render, screen} from '@testing-library/react';
import Badge from './Badge';

describe('test Badge component', () => {
    it('render Badge component', () => {
        const text = 'I am a sample test';
        render(<Badge title={text}>{text}</Badge>);
        expect(screen.queryByText(text)).toBeInTheDocument();
    });
    it('create snapshot', () => {
        const anotherText = 'I am a text';
        const {container} = render(<Badge title={anotherText}>{anotherText}</Badge>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
