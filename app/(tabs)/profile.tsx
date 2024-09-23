import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/stores/authStore";

const profile = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleExit = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>profile</Text>
      <Button title="exit" onPress={handleExit} />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
