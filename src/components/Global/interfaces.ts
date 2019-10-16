import {ActionMap} from "./GlobalState";
import {ITodo} from "../Todo/interfaces";

export interface MainState {
    todos: ITodo[];
}

export interface ContextProps {
    state: MainState;
    actions: ActionMap<MainState, Actions>;
}

export interface Actions {
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (todo: ITodo) => void;
}

export const initialData: MainState = {
    todos: []
};
