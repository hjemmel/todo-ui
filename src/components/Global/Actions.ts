import { Actions, MainState, TodoState } from "./interfaces";
import { ActionMap } from "./GlobalState";
import { ITodo } from "../Todo/interfaces";

function filterList(todoState: TodoState, todos: ITodo[]) {
  switch (todoState) {
    case "COMPLETED":
      return [...todos.filter((item) => item.done)];
    case "ACTIVE":
      return [...todos.filter((item) => !item.done)];
    default:
      return [...todos];
  }
}

export const actions: ActionMap<MainState, Actions> = {
  addAll: (todos: ITodo[]) => (state: MainState) => {
    return {
      ...state,
      todos,
      filteredTodos: filterList(state.todoState, todos),
      loading: false,
    };
  },

  addTodo: (todo: ITodo) => (state: MainState) => {
    const todos = [...state.todos, todo];

    return {
      ...state,
      todos,
      filteredTodos: filterList(state.todoState, todos),
      loading: false,
    };
  },

  isLoading: (loading: boolean) => (state: MainState) => {
    return { ...state, loading };
  },

  updateTodo: (todo: ITodo) => (state: MainState) => {
    const index = state.todos.findIndex((item) => todo.id === item.id);

    const todos = [...state.todos];

    todos[index] = {
      ...todos[index],
      ...todo,
    };

    return {
      ...state,
      todos,
      filteredTodos: filterList(state.todoState, todos),
      loading: false,
    };
  },

  filterTodos: (todoState: TodoState) => (state: MainState) => {
    switch (todoState) {
      case "COMPLETED":
        return {
          ...state,
          todoState: todoState,
          filteredTodos: filterList(todoState, state.todos),
        };
      case "ACTIVE":
        return {
          ...state,
          todoState: todoState,
          filteredTodos: filterList(todoState, state.todos),
        };
      default:
        return {
          ...state,
          todoState: todoState,
          filteredTodos: filterList(todoState, state.todos),
        };
    }
  },
};
