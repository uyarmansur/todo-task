import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className=" mx-auto p-6">
      <h1 className="text-2xl font-bold text-center">Görev Listesi</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
