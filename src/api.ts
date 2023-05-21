import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import router from "./router";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await router.push({ path: "/login" });
      console.log("401");
    }

    if (error.response?.status === 403) {
      if (error.response?.data) {
        // @ts-ignore
        alert('Yetkiniz yok' + error.response?.data.errorMessage);
      }
    }
  }
);

export const checkLogin = async () => {
  const result = await api.get("/user/check");

  if (result?.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default api;
