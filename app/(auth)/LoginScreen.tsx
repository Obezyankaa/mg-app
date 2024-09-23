import { useAuthStore } from "@/stores/authStore";
import React, { useState } from "react";
import { TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated) {
    // Перенаправление на главный экран после авторизации
    // Можно использовать навигацию, например react-navigation
  }

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
}
