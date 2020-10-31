import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Root from './components/Root/Root';

import todoStatus from './constants/status';
import NotFound from 'components/NotFound/NotFound';

export default function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                {Object.values(todoStatus).map((value) => (
                    <Route path={'/' + (value === todoStatus.ALL ? '' : value)} key={value} exact>
                        <Root />
                    </Route>
                ))}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}
