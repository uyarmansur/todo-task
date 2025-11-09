"use client";

import { useEffect } from "react";
import { getApi } from "@/services/getApi";
import { useStore } from "@/store/useStore";
import { Todo } from "@/types/types";
import { putApi } from "@/services/putApi";
import { deleteApi } from "@/services/deleteApi";

export default function TodoList() {
  const { todos, setTodos, updateTodo } = useStore();

  useEffect(() => {
    getApi("/api/todos").then((res) => {
      setTodos(res.data);
    });
  }, [setTodos]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const updatedTodo = await putApi(`/api/todos/${id}`, {
        status: newStatus,
      } as Todo);

      updateTodo(updatedTodo);
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    deleteApi(`/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-orange-800">
          <tr className="text-left">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Created At</th>
            <th className="p-3 border-b text-center">Action</th>
            <th className="p-3 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          {todos
            ? todos?.map((todo: Todo, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-amber-400 transition-colors duration-150"
                >
                  <td className="p-3 border-b font-medium text-gray-800">
                    {todo?.title}
                  </td>
                  <td className="p-3 border-b text-gray-600">
                    {todo.description || "-"}
                  </td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        todo?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : todo?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {todo?.status}
                    </span>
                  </td>
                  <td className="p-3 border-b text-gray-500">
                    {new Date(todo.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-3 border-b text-center">
                    <select
                      value={todo?.status}
                      onChange={(e) =>
                        handleStatusChange(todo?.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400 "
                    >
                      <option value="pending" className="bg-amber-950">
                        Pending
                      </option>
                      <option value="completed" className="bg-amber-950">
                        Completed
                      </option>
                    </select>
                  </td>
                  <td className="cursor-pointer border rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400 hover:bg-red-500 hover:text-white text-center">
                    <p
                      className=""
                      onClick={() => handleDelete(todo?.id)}
                    >
                      x
                    </p>
                  </td>
                </tr>
              ))
            : "Loading.."}
        </tbody>
      </table>
    </div>
  );
}
