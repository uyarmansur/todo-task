export interface Todo {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: Date;
}
