import {ActionMap} from "./GlobalState";
import {ITodo} from "../Todo/interfaces";

export type TodoState = "ALL" | "ACTIVE" | "COMPLETED";

export interface MainState {
    todos: ITodo[];
    filteredTodos: ITodo[];
    todoState: TodoState;
}

export interface ContextProps {
    state: MainState;
    actions: ActionMap<MainState, Actions>;
}

export interface Actions {
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (todo: ITodo) => void;
    filterTodos: (todoState: TodoState) => void;
}

export const initialData: MainState = {
    todos: [],
    filteredTodos: [],
    todoState: "ALL"
};
