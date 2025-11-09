"use client";

import { useEffect } from "react";
import { useTodoStore } from "@/store/useTodoStore";

import { useTodoService } from "@/services/todo";
import TrashIcon from "../icons/Trash";
import Badge from "../ui/Badge";
import Loader from "../common/Loader";

export default function TodoList() {
  const { todos, setTodos, loading } = useTodoStore();
  const { fetchTodos, updateTodoStatus, deleteTodo } = useTodoService();
  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  const handleStatusChange = async (newStatus: string, id?: string) => {
    await updateTodoStatus(newStatus, id!);
  };

  const handleDelete = async (id?: string) => {
    await deleteTodo(id!);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-700 text-green-200 shadow-neon-green";
      case "pending":
        return "bg-yellow-700 text-yellow-200 shadow-neon-yellow";
      default:
        return "bg-gray-700 text-gray-200 shadow-neon-gray";
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!loading && todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">
          Henüz eklenmiş bir görev yok.
        </h2>
        <p className="text-gray-500">Lütfen yeni görevler ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="p-6 border border-teal-500 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out bg-gray-800/70 transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-teal-400 truncate max-w-[80%]">
                {todo?.title}
              </h3>
              <Badge className={getStatusClasses(todo?.status)}>
                {todo?.status === "completed" ? "Tamamlandı" : "Beklemede"}
              </Badge>
            </div>

            <p className="text-gray-400 mb-4 text-sm h-12 overflow-hidden">
              {todo?.description || (
                <span className="italic text-gray-500">Açıklama yok</span>
              )}
            </p>

            <hr className="border-gray-700 mb-4" />

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.status === "completed"}
                  onChange={(e) =>
                    handleStatusChange(
                      e.target.checked ? "completed" : "pending",
                      todo.id
                    )
                  }
                  className="w-5 h-5 accent-teal-400 rounded border-teal-500 transition"
                />
              </label>

              <span className="text-xs text-gray-500 ml-auto mr-4">
                {todo?.createdAt
                  ? new Date(todo.createdAt).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Tarih yok"}
              </span>
              <TrashIcon onClick={() => handleDelete(todo?.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
