// src/utils/axiosInstance.ts
import axios from "axios";
// import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  // baseURL: Config.API_URL,
  baseURL: "http://188.225.35.184",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик ответов для обработки истечения токена
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, если ошибка 401 (Unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      // Обновляем access-токен через refresh-токен
      try {
        const response = await axiosInstance.post("/api/auth/jwt/refresh/", {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;

        // Сохраняем новый access-токен
        await AsyncStorage.setItem("accessToken", newAccessToken);

        // Обновляем заголовок и повторяем оригинальный запрос
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Если обновление не удалось, пользователь должен быть разлогинен
        const { logout } = useAuthStore.getState();
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
