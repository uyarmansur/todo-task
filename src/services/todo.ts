// useTodoService.ts
import { useTodoStore } from "@/store/useTodoStore";
import { deleteApi, getApi, postApi, putApi } from "./api";
import { toast } from "react-toastify";
import { Todo } from "@/types/types";

export const useTodoService = () => {
  const { todos, setTodos, updateTodo, addTodo } = useTodoStore();

  const fetchTodos = async () => {
    try {
      const res = await getApi("/api/todos");
      setTodos(res.data);
    } catch (err) {
      toast.error("Veriler getirilirken bir hata oluştu.");
    }
  };

  const addSingleTodo = async (todo: Todo) => {
    const toastId = toast.loading("İşlem yapılıyor...");
    try {
      const res = await postApi("/api/todos", todo);
      addTodo(res);
      toast.update(toastId, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Veri eklenirken bilinmeyen bir hata oluştu",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const updateTodoStatus = async (newStatus: string, id: string) => {
    const toastId = toast.loading("İşlem yapılıyor...");

    if (!id) return;

    try {
      const updatedTodo = await putApi(`/api/todos/${id}`, {
        status: newStatus,
      } as Todo);

      updateTodo(updatedTodo);
      toast.update(toastId, {
        render: updatedTodo.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Veri güncellenirken bilinmeyen bir hata oluştu.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    const toastId = toast.loading("İşlem yapılıyor...");
    try {
      const res = await deleteApi(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.update(toastId, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Silinirken hata oluştu.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return { fetchTodos, addSingleTodo, deleteTodo, updateTodoStatus };
};
