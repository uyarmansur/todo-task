import { Todo } from "@/types/types";

export const postApi = async (url: string, data: Todo) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const awaitedJson = await res.json();
  return awaitedJson.data;
};
