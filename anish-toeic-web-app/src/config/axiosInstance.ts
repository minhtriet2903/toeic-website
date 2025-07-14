import { notification } from "antd";
import axios from "axios";

const BASE_URL = `${import.meta.env.ANISH_SERVICE_URL}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      notification.error({ message: "Session expired. Please log in again." });
      // window.location.href = "/login";
    }
  }
);

export default axiosInstance;
