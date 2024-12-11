import axios from "axios";
import { TOKEN_KEY } from "../provider/authProvider";

const req = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
});

req.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

req.interceptors.response.use((resp) => {
  return resp.data.data;
});
export { req };
