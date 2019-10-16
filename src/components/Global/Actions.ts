import { Actions, MainState } from "./interfaces";
import {ActionMap} from "./GlobalState";
import {ITodo} from "../Todo/interfaces";


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const actions: ActionMap<MainState, Actions> = {

    addTodo: (text: string) => (state: MainState) => {

        const todo = { id: uuidv4(), name: text,  done: false};
        const todos = [...state.todos, todo];

        return { ...state, todos };
    },

    removeTodo: (id: string) => (state: MainState) => {
        const todos = state.todos.filter(item => id !== item.id);

        return { ...state, todos };
    },

    updateTodo: (todo: ITodo) => (state: MainState) => {
        const index = state.todos.findIndex(item => todo.id === item.id);

        const todos = [...state.todos];

        todos[index] = {
            ...todos[index],
            ...todo
        };

        return { ...state, todos };
    }
};
