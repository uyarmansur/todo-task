export interface Todo {
  id?: string | undefined;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt?: Date | undefined;
}
