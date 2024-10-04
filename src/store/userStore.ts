// src/store/userStore.ts
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileState {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  profile: {
    first_name: string;
    last_name: string;
    middle_name: string;
    is_staff: boolean;
    phone_number: string | null;
    second_email: string | null;
    telega: string | null;
    skype: string | null;
    organization: string | null;
    job_title: string | null;
    department: string | null;
    cabinet: string | null;
  };
  date_joined: string | null;
}

interface UserStoreState {
  profile: ProfileState | null;
  loadProfile: () => Promise<void>;
}

export const useProfileStore = create<UserStoreState>((set, get) => ({
  profile: null,

  loadProfile: async () => {
    // Проверяем, загружен ли профиль уже
    if (get().profile) {
      return;
    }

    try {
      // Проверяем, есть ли профиль в AsyncStorage
      const storedProfile = await AsyncStorage.getItem("profile");
      if (storedProfile) {
        set({ profile: JSON.parse(storedProfile) });
        return;
      }

      // Если профиля нет в AsyncStorage, делаем запрос к API
      const accessToken = await AsyncStorage.getItem("accessToken");
      const username = await AsyncStorage.getItem("username");

      if (!accessToken || !username) {
        throw new Error("Access token or username not found");
      }


      const response = await axiosInstance.get(
        `/api/users/info-profile/${username}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Сохраняем данные профиля в Zustand и в AsyncStorage
      set({ profile: response.data });
      await AsyncStorage.setItem("profile", JSON.stringify(response.data));

    } catch (error) {
      console.error("Error loading profile:", error);
    }
  },
}));

