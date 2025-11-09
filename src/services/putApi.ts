import { Todo } from "@/types/types";

export const putApi = async (url: string, data: Todo) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const awaitedJson = await res.json();
  return awaitedJson.data;
};
