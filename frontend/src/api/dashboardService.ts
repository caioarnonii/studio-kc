const API_URL = "http://localhost:3000"; 

export const getDashboard = async () => {
  const response = await fetch(`${API_URL}/dashboard`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dashboard");
  }

  return response.json();
};