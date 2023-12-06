import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../services/firebase.js";
import { signOut } from "firebase/auth";

// In this screen, the user will be able to see their profile information, as well as log out.
// In the future, we will add functionality to edit profile information, as well as change password.
// We will also add functionality to delete the user's account.

const ProfileScreen = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Log ud</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButton: {
    backgroundColor: "#E63946",
    width: "60%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 5,
  },
});
