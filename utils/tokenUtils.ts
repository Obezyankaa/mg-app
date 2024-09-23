import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl);
export const refreshAccessToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (refreshToken) {
    const response = await fetch(`${apiUrl}/api/auth/jwt/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    if (data.access) {
      await AsyncStorage.setItem("accessToken", data.access);
    }
    return data.access;
  }
  throw new Error("Не удалось обновить токен");
};
