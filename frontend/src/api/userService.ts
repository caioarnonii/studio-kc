const API_URL = "http://localhost:3000";

export const getClients = async (search = "") => {
  const url = `${API_URL}/users?role=CLIENT&search=${search}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar clientes");
  }

  return response.json();
};