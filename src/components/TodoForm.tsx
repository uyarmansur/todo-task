"use client";

import { useState } from "react";
import { postApi } from "@/services/postApi";
import { useStore } from "@/store/useStore";
import { Todo } from "@/types/types";

export default function TodoForm() {
  const [todo, setTodo] = useState<Omit<Todo, "id" | "createdAt">>({
    title: "",
    description: "",
    status: "pending",
  });

  const { addTodo } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo.title.trim()) return;

    const newTodo = await postApi("/api/todos", todo as Todo);

    addTodo(newTodo);

    setTodo({
      title: "",
      description: "",
      status: "pending",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mt-4 max-w-lg mx-auto"
    >
      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        placeholder="Title..."
        className="border p-2 rounded w-full"
      />

      <input
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        placeholder="Description (optional)..."
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}
