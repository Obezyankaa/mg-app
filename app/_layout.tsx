import { Stack } from "expo-router";
import LoginScreen from "./(auth)/LoginScreen";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [loading, setLoading] = useState(true); // состояние загрузки

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setLoading(false); // после проверки отключаем индикатор
    };
    initAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
