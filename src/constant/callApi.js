export const fetchApi = async (url) => {
  console.log("11111", url)
  const response = await fetch(url);
  console.log("22222", url)
  if (!response.ok) {
    console.log("333333", url)
    throw new Error("Failed to fetch users");
  }
  console.log("444444", url)
  return response.json();
};
