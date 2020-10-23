export interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    badges: Array<string>;
}

export enum Keys {
    badges = 'badges',
    title = 'title'
}

export interface CommonProps {
    children: JSX.Element | JSX.Element[] | string;
}
