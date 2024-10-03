import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../Screen/DetailsScreen";
import HomeScreen from "../Screen/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="главная" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
