import axios from "axios";
import type { HttpError } from "@refinedev/core";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
