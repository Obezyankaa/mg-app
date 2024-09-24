import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      <Link
        href={{
          pathname: "/details/[id]",
          params: { id: "bacon" },
        }}
      >
        View user details
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({});
