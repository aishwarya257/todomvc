import todoStatus from '../../constants/status';
import {ITodo} from '../../interfaces';

const {COMPLETED, ACTIVE} = todoStatus;

export const getFilteredTodos = (currentlyViewing: string, todos: Array<ITodo>): Array<ITodo> => {
    return todos.filter(({completed}) => {
        switch (currentlyViewing) {
            case ACTIVE:
                return !completed;
            case COMPLETED:
                return completed;
            default:
                return true;
        }
    });
};
