// Libraries
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

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
      <Tab.Navigator>
        {user ? (
          <>
          {/* Screens that are only visible when the user is signed in */}
            <Tab.Screen options={{ title: "Udlejninger" }} name="Rentals" component={RentalsScreen} />
            <Tab.Screen options={{ title: "Dine ting" }} name="YourItems" component={YourItemsScreen} />
            <Tab.Screen options={{ title: "Beskeder" }} name="Messages" component={MessagesScreen} />
            <Tab.Screen options={{ title: "Søg" }} name="Search" component={SearchScreen} />
            <Tab.Screen options={{ title: "Profil" }} name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
          {/* Screen(s) visible to a user who isn't signed in*/}
            <Tab.Screen options={{ title: "GearMore", tabBarStyle: { display: 'none'} }} name="Log in" component={LoginScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
