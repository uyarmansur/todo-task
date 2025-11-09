import { create } from "zustand";
import { Todo } from "@/types/types";

interface TodoState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  setTodos: (todos: Todo[]) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  todos: [],
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  setTodos: (todos) => set({ todos }),
  updateTodo: (updatedTodo: Todo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    })),
}));
