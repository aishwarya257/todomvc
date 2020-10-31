export interface ITodo {
    id: string;
    completed: boolean;
    [Keys.title]: string;
    [Keys.badges]: Array<string>;
}

export enum Keys {
    badges = 'badges',
    title = 'title'
}

export interface CommonProps {
    children: JSX.Element | JSX.Element[] | string | null;
}

export type SlicedStateProps = {[Keys.badges]: string[]; [Keys.title]: string};
