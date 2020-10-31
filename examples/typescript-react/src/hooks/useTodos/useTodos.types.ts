import {ITodo, SlicedStateProps} from '../../interfaces';

export enum TodosConstants {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    REMOVE_COMPLETED = 'REMOVE_COMPLETED',
    TOGGLE_ALL_COMPLETED = 'TOGGLE_ALL_COMPLETED'
}

type ActionMap<M extends {[index: string]: undefined | SlicedStateProps | ITodo}> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

type WithoutPayloadProps = {
    [TodosConstants.REMOVE_COMPLETED]: undefined;
    [TodosConstants.TOGGLE_ALL_COMPLETED]: undefined;
};

type ITodoActionProps = {
    [TodosConstants.REMOVE_TASK]: ITodo;
    [TodosConstants.TOGGLE_TASK]: ITodo;
    [TodosConstants.UPDATE_TASK]: ITodo;
};

type AddProps = {
    [TodosConstants.ADD_TASK]: SlicedStateProps;
};

export type ActionsWithoutPayload = ActionMap<WithoutPayloadProps>[keyof ActionMap<
    WithoutPayloadProps
>];

export type ActionsWithPayload = ActionMap<ITodoActionProps>[keyof ActionMap<ITodoActionProps>];

export type AddPropsPayLoad = ActionMap<AddProps>[keyof ActionMap<AddProps>];

export type TodoActions = ActionsWithPayload | ActionsWithoutPayload | AddPropsPayLoad;
