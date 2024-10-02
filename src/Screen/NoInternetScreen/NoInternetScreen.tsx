import React from "react";
import { View, Text, Button } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NoInternetScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No Internet Connection</Text>
      <Button title="Try Again" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default NoInternetScreen;