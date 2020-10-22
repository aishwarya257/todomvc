interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    badges: Array<string>;
}

interface ITodoItemState {
    editText: string;
}
