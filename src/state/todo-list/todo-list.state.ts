export interface TodoItem {
    name: String;
    done: Boolean;
}

export type State = Array<TodoItem>;

export const initialState: State = [
    { name: 'clean room', done: false },
    { name: 'make pancakes', done: false },
    { name: 'spend 3 hours on reddit', done: true }
];
