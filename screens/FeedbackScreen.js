import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../services/firebase.js";
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import app from "../services/firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

const FeedbackScreen = () => {
  const db = getFirestore(app);
  const feedbackRef = collection(db, "feedback");
  const feedbackQuery = query(feedbackRef, orderBy("createdAt"), limit(25));
  const [feedback] = useCollectionData(feedbackQuery, { idField: "id" });
  const [newFeedbackEntry, setNewFeedbackEntry] = useState("");

  const addFeedback = async () => {
    if (newFeedbackEntry.trim() !== "") {
      await addDoc(feedbackRef, {
        text: newFeedbackEntry,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      setNewFeedbackEntry("");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Hvad synes der skal ændres?"
        value={newFeedbackEntry}
        onChangeText={(text) => setNewFeedbackEntry(text)}
        multiline={true}
        numberOfLines={5}
      ></TextInput>
      <TouchableOpacity onPress={addFeedback} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1D3557",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    height: "25%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
