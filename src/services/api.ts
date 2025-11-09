import { Todo } from "@/types/types";

export const getApi = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
};

export const postApi = async (url: string, data: Todo) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const awaitedJson = await res.json();
  return awaitedJson.data;
};

export const putApi = async (url: string, data: Todo) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const awaitedJson = await res.json();
  return awaitedJson.data;
};

export const deleteApi = async (url: string) => {
  const res = await fetch(url, {
    method: "DELETE",
  });
  return res.json();
};
