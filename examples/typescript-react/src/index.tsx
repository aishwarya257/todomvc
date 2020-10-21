import React from 'react';
import ReactDOM from 'react-dom';
import {TodoModel} from './components/todoModel';
import App from './App';

const model = new TodoModel('react-todos');

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App model={model} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

model.subscribe(render);
render();
