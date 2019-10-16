import {ActionMap} from "./GlobalState";
import {ITodo} from "../Todo/interfaces";

export type TodoState = "ALL" | "ACTIVE" | "COMPLETED";

export interface MainState {
    todos: ITodo[];
    filteredTodos: ITodo[];
    todoState: TodoState;
    loading: boolean
}

export interface ContextProps {
    state: MainState;
    actions: ActionMap<MainState, Actions>;
}

export interface Actions {
    addTodo: (text: string) => void;
    updateTodo: (todo: ITodo) => void;
    filterTodos: (todoState: TodoState) => void;
    addAll: (todos: ITodo[]) => void;
    isLoading: (loading: boolean) => void;
}

export const initialData: MainState = {
    todos: [],
    filteredTodos: [],
    todoState: "ALL",
    loading: false,
};
