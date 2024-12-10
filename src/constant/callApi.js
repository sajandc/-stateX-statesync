export const fetchApi = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  };
  