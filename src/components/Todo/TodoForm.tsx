"use client";

import { useState } from "react";
import { Todo } from "@/types/types";
import { useTodoService } from "@/services/todo";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";

export default function TodoForm() {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
    status: "pending",
  });

  const { addSingleTodo } = useTodoService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSingleTodo(todo);
    setTodo({ title: "", description: "", status: "pending" });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-800/90 border border-teal-600 rounded-xl max-w-xl mx-auto mt-8 space-y-4 mb-4"
      >
        <h2 className="text-2xl font-bold text-teal-400 mb-4 text-center">
          Yeni Görev Ekle
        </h2>
        <Input
          value={todo?.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="Görevin Başlığı..."
        />
        <TextArea
          value={todo?.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          placeholder="Açıklama (Opsiyonel)..."
        />

        <Button title="Görev Ekle" />
      </form>
    </>
  );
}
