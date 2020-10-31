import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

export function renderWithRouter(
    ui,
    {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {}
) {
    const Wrapper = ({children}) => <Router history={history}>{children}</Router>;
    return {
        ...render(ui, {wrapper: Wrapper}),

        history
    };
}
