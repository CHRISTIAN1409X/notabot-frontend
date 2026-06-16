import api from "./apiAxios";

export const verifySession = async () => {
  try {
    const response = await api.get("/api/auth/verify");

    return response.data;
  } catch (error) {
    return null;
  }
};