import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <ThemedText type="title">Explore</ThemedText>
      <Link
        href={{
          pathname: "/details/[id]",
          params: { id: "bacon" },
        }}
      >
        <ThemedText type="default"> View user details</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({});
