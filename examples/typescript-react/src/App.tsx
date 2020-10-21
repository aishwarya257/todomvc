/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

/// <reference path="./components/interfaces.d.ts"/>

import {Router} from 'director/build/director.js';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Footer from './components/Footer/Footer';
import todoStatus from './constants/status';
import constants from './constants/keyCodes';
import TodoList from 'components/TodoList/TodoList';
import TodoForm from 'components/TodoForm/TodoForm';
const {ALL, ACTIVE, COMPLETED} = todoStatus;
export default class App extends React.Component<IAppProps, IAppState> {
    public state: IAppState;

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            nowShowing: ALL,
            editing: null
        };
    }

    public componentDidMount() {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {nowShowing: ALL}),
            '/active': setState.bind(this, {nowShowing: ACTIVE}),
            '/completed': setState.bind(this, {nowShowing: COMPLETED})
        });
        router.init('/');
    }

    public handleNewTodoKeyDown(event: React.KeyboardEvent) {
        const {ENTER} = constants;
        if (event.key !== ENTER) {
            return;
        }

        event.preventDefault();

        var val = (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement).value.trim();

        if (val) {
            this.props.model.addTodo(val);
            (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement).value = '';
        }
    }

    public toggleAll(event: React.FormEvent) {
        var target: any = event.target;
        var checked = target.checked;
        this.props.model.toggleAll(checked);
    }

    public toggle(todoToToggle: ITodo) {
        this.props.model.toggle(todoToToggle);
    }

    public destroy(todo: ITodo) {
        this.props.model.destroy(todo);
    }

    public edit(todo: ITodo) {
        this.setState({editing: todo.id});
    }

    public save(todoToSave: ITodo, text: String) {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    }

    public cancel() {
        this.setState({editing: null});
    }

    public clearCompleted() {
        this.props.model.clearCompleted();
    }

    public render() {
        const todos = this.props.model.todos;

        const shownTodos = todos.filter((todo) => {
            switch (this.state.nowShowing) {
                case ACTIVE:
                    return !todo.completed;
                case COMPLETED:
                    return todo.completed;
                default:
                    return true;
            }
        });

        // Note: It's usually better to use immutable data structures since they're
        // easier to reason about and React works very well with them. That's why
        // we use map(), filter() and reduce() everywhere instead of mutating the
        // array or todo items themselves.
        const activeTodoCount = todos.reduce(
            (total, todo) => (todo.completed ? total : total + 1),
            0
        );

        const completedCount = todos.length - activeTodoCount;
        return (
            <div>
                <TodoForm showCheckbox={!!todos.length} checked={activeTodoCount === 0}>
                    <TodoList items={shownTodos} />
                </TodoForm>
                {(activeTodoCount || completedCount) && (
                    <Footer
                        count={activeTodoCount}
                        completedCount={completedCount}
                        nowShowing={this.state.nowShowing}
                        onClearCompleted={(e) => this.clearCompleted()}
                    />
                )}
            </div>
        );
    }
}
