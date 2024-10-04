import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useProfileStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const { profile, loadProfile } = useProfileStore();
  const { logout, isAuthenticated } = useAuthStore();

  // Загрузить данные профиля при загрузке компонента
  useEffect(() => {
    if (!profile) {
      loadProfile();
    }
  }, [profile]); // Загружаем профиль только если его нет

  const handleLogout = async () => {
    await logout();
    if (isAuthenticated) {
      console.log("logout successful");
    }
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Text style={styles.text}>Username: {profile.username}</Text>
          <Text style={styles.text}>Email: {profile.email}</Text>
          <Text style={styles.text}>
            Full Name: {profile.profile.first_name} {profile.profile.last_name}
          </Text>
          <Text style={styles.text}>Phone: {profile.profile.phone_number}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading profile...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Profile;
