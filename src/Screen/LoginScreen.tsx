// src/Screen/LoginScreen.tsx
import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useAuthStore } from "../store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { login, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password);
    if (isAuthenticated) {
      console.log("Login successful");
    }
  };

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
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default LoginScreen;
