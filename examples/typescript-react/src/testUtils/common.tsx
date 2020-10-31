import {TodoActions, TodosConstants} from '../hooks/useTodos/useTodos.types';

const common = {
    mockSetTodos: (
        actionType: keyof typeof TodosConstants,
        callback?: (arg: TodoActions) => void
    ): jest.Mock => {
        return jest.fn(({type, payload}) => {
            expect(type).toBe(actionType);
            callback && callback({type, payload});
        });
    }
};

export default common;
