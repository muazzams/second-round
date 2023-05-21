import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import router from "./router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const toast = useToast();

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // @ts-ignore
    toast.error(error.response?.data.errorMessage,{
      position:"top-right"
    })
    if (error.response?.status === 401) {
      await router.push({ path: "/login" });
    } 
  }
);

export const checkLogin = async () => {
  const result = await api.get("/user/check");
  return result?.status === 200;
};

export async function logout(){
  await api.post("/auth/logout");
  await router.push({ path: "/login" });
}

export default api;
