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
      {userProfile ? (
        <View style={styles.profileContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.avatarPlaceholder}>B</Text>
            <Text style={styles.name}>
              {userProfile.profile.first_name} {userProfile.profile.last_name}{" "}
              {userProfile.profile.middle_name}
            </Text>
          </View>
          <Text style={styles.username}>Логин: {userProfile.username}</Text>
          <Text style={styles.accessLevel}>
            Уровень доступа: {userProfile.is_staff ? "Админ" : "Пользователь"}
          </Text>
          {/* Можно добавить любые другие данные профиля */}
        </View>
      ) : (
        <Text style={styles.loadingText}>Загрузка данных профиля...</Text>
      )}
      <Button title="Выйти" onPress={handleExit} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // основной контейнер для всей страницы
  },
  profileContainer: {
    // контейнер для блока с данными профиля
  },
  nameContainer: {
    // контейнер для имени и аватара
  },
  avatarPlaceholder: {
    // стиль для отображения аватара (если его нет)
  },
  name: {
    // стиль для отображения имени пользователя
  },
  username: {
    // стиль для логина пользователя
  },
  accessLevel: {
    // стиль для уровня доступа
  },
  loadingText: {
    // стиль для текста загрузки
  },
  logoutButton: {
    // стиль для кнопки "Выйти"
  },
});
