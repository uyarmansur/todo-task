export const deleteApi = async (url: string) => {
  const res = await fetch(url, {
    method: "DELETE",
  });
  return res.json();
};
