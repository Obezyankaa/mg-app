import { StyleSheet, Text, useColorScheme, TextStyle } from "react-native";
import React from "react";
import type { PropsWithChildren } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

type SectionProps = PropsWithChildren<{
  text: string;
  type?: string; // Проп для пользовательских стилей
}>;

const CustomText = ({ text, type }: SectionProps) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Text
      style={[
        { color: isDarkMode ? Colors.white : Colors.black },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});

export default CustomText;
