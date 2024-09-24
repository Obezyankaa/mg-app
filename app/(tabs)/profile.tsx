import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/stores/authStore";

const Profile = () => {
  // Получаем данные профиля пользователя из хранилища Zustand
  const userProfile = useAuthStore((state) => state.userProfile);
  const logout = useAuthStore((state) => state.logout);

  const handleExit = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль пользователя</Text>

      {/* Если данные профиля загружены, отобразим их */}
      {userProfile ? (
        <View>
          <Text>Имя пользователя: {userProfile.profile.first_name}</Text>
          <Text>Email: {userProfile.email}</Text>
          {/* Можешь добавить любые другие данные профиля, которые есть */}
        </View>
      ) : (
        <Text>Загрузка данных профиля...</Text>
      )}

      <Button title="Выйти" onPress={handleExit} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
