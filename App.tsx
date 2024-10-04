// App.tsx
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  useColorScheme,
  ActivityIndicator,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuthStore } from "./src/store/authStore"; // Импорт zustand
import LoginScreen from "./src/Screen/LoginScreen"; // Экран авторизации

// Импортируйте ваши экраны
import SettingsScreen from "./src/Screen/SettingsScreen";
import Profile from "./src/Screen/ProfileScreen";
import HomeNavigation from "./src/navigation/HomeNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Tab = createBottomTabNavigator();

  // Используем Zustand
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Инициализация авторизации при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      await initializeAuth();
      setLoading(false);
    };
    checkAuth();
  }, [initializeAuth]);

  // Показать спиннер пока идет проверка авторизации
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <SafeAreaProvider>
        {isAuthenticated ? (
          <Tab.Navigator initialRouteName="MainHome">
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: "Профиль",
                headerTitle: "Личные данные",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="MainHome"
              component={HomeNavigation}
              options={{
                tabBarLabel: "Главная",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerTitle: "Настройки",
                tabBarLabel: "Настройки",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          // Если пользователь не авторизован, показываем экран логина
          <LoginScreen />
        )}
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
