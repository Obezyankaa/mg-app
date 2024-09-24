import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "@/services/getUserProfile";
import { loginService } from "@/services/authService";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  username: string | null;
  userProfile: any | null; // Добавляем userProfile
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  checkUserProfileCache: () => Promise<void>; // Функция для проверки TTL
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  username: null,
  userProfile: null, // Инициализируем userProfile

  login: async (username, password) => {
    const { access, refresh } = await loginService(username, password);

    await AsyncStorage.setItem("accessToken", access);
    await AsyncStorage.setItem("refreshToken", refresh);

    const userProfile = await getUserProfile(access, username);

    // Сохранение данных профиля в AsyncStorage с меткой времени
    await AsyncStorage.setItem("userProfile", JSON.stringify(userProfile));
    await AsyncStorage.setItem(
      "userProfileTimestamp",
      JSON.stringify(Date.now())
    ); // Сохраняем время

    set({
      accessToken: access,
      refreshToken: refresh,
      username: username,
      isAuthenticated: true,
      userProfile: userProfile,
    });
  },

  checkAuth: async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const savedUserProfile = await AsyncStorage.getItem("userProfile");

    if (accessToken) {
      set({
        accessToken,
        isAuthenticated: true,
        userProfile: savedUserProfile ? JSON.parse(savedUserProfile) : null,
      });
    }
  },

  checkUserProfileCache: async () => {
    const cacheDuration = 7 * 24 * 60 * 60 * 1000; // 7 дней
    const savedUserProfile = await AsyncStorage.getItem("userProfile");
    const userProfileTimestamp = await AsyncStorage.getItem(
      "userProfileTimestamp"
    );

    if (savedUserProfile && userProfileTimestamp) {
      const now = Date.now();
      const timestamp = JSON.parse(userProfileTimestamp);

      if (now - timestamp < cacheDuration) {
        // Кэш действителен
        set({ userProfile: JSON.parse(savedUserProfile) });
      } else {
        // Кэш истек, нужно загрузить новый профиль
        const accessToken = await AsyncStorage.getItem("accessToken");
        const username = get().username; // Получаем значение username из состояния
        if (accessToken && username) {
          const userProfile = await getUserProfile(accessToken, username);
          await AsyncStorage.setItem(
            "userProfile",
            JSON.stringify(userProfile)
          );
          await AsyncStorage.setItem(
            "userProfileTimestamp",
            JSON.stringify(Date.now())
          );

          set({ userProfile });
        }
      }
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userProfile");
    await AsyncStorage.removeItem("userProfileTimestamp");
    set({
      accessToken: null,
      refreshToken: null,
      username: null,
      isAuthenticated: false,
      userProfile: null,
    });
  },
}));

