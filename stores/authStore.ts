import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  login: async (username, password) => {
    const { loginService } = require("../services/authService");
    const { access, refresh } = await loginService(username, password);

    await AsyncStorage.setItem("accessToken", access);
    await AsyncStorage.setItem("refreshToken", refresh);

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  checkAuth: async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      set({ accessToken, isAuthenticated: true });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
}));
