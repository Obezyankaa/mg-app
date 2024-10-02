import { StyleSheet, View, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CustomView = ({ children }) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        flex: 1, // чтобы заполнить экран
        justifyContent: "center", // для центрирования
        alignItems: "center", // для центрирования
      }}
    >
      {children}
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({});
