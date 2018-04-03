import { State, initialState } from './todo-list.state';
import { TodoListActionTypes, TodoListActions } from './todo-list.actions';

export function todoListReducer(state = initialState, action: TodoListActions): State {
    switch (action.type) {
        case TodoListActionTypes.ADD_TODO: 
            return [
                ...state, {
                    name: action.payload.name,
                    done: false
                }
            ]

        case TodoListActionTypes.TOGGLE_TODO:
            return [...state]
            .map((obj, i) => {
                if (action.payload.index === i) {
                    return {
                        ...obj,
                        done: action.payload.done || !obj.done
                    }
                }
                return obj;
            })

        default: {
            return state;
        }
    }
}