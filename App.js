// Libraries
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

// Screens
import LoginScreen from "./screens/LoginScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RentalsScreen from "./screens/RentalsScreen";
import SearchScreen from "./screens/SearchScreen";
import YourItemsScreen from "./screens/YourItemsScreen";

// Navigation
const Tab = createBottomTabNavigator();

export default function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <NavigationContainer>
      <Tab.Navigator
      // Styling af tabbar
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Rentals") {
              iconName = focused ? "key" : "key-outline";
            } else if (route.name === "YourItems") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Messages") {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Log in") {
              iconName = focused ? "log-in" : "log-in-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {user ? (
          <>
            {/* Screens som kun kan ses når en bruger er logget ind*/}
            <Tab.Screen options={{ title: "Lejemål" }} name="Rentals" component={RentalsScreen} />
            <Tab.Screen options={{ title: "Mine ting" }} name="YourItems" component={YourItemsScreen} />
            <Tab.Screen options={{ title: "Anmodninger" }} name="Messages" component={MessagesScreen} />
            <Tab.Screen options={{ title: "Søg" }} name="Search" component={SearchScreen} />
            <Tab.Screen options={{ title: "Profil" }} name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            {/* Screen(s) som kan ses når en bruger ikke er logget ind*/}
            <Tab.Screen
              options={{ title: "GearMore", headerShown:false, tabBarStyle: { display: "none" } }}
              name="Log in"
              component={LoginScreen}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
