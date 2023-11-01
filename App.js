// Libraries
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

// Screens
import FeedbackScreen from "./screens/FeedbackScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CameraScreen from "./screens/CameraScreen";

// Navigation
const Drawer = createDrawerNavigator();

export default function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {user ? (
          <>
            <Drawer.Screen options={{ title: "Min dagbog" }} name="Home" component={HomeScreen} />
            <Drawer.Screen options={{ title: "Profil" }} name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Feedback" component={FeedbackScreen} />
            <Drawer.Screen options={{ title: "Billede upload" }} name="Camera" component={CameraScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen options={{ title: "JournalApp" }} name="Log in" component={LoginScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
