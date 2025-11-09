export const getApi = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
};
