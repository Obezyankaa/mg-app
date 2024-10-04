// src/store/authStore.ts
import {create} from "zustand";
import axiosInstance from "../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  initializeAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  // Инициализация авторизации
  initializeAuth: async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    }
  },

    login: async (username, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/jwt/create/", {
        username,
        password,
      });
      const { access, refresh } = response.data;

      // Сохранение токенов в AsyncStorage
      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken", refresh);
      await AsyncStorage.setItem("username", username);


      set({
        accessToken: access,
        refreshToken: refresh,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  logout: async () => {
    // Удаляем токены при выходе
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));
