import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../services/firebase.js";
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import app from "../services/firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  // declare logic here
  const db = getFirestore(app);
  const journalsRef = collection(db, "journals");
  const journalsQuery = query(journalsRef, orderBy("createdAt"), limit(25));
  const [journals] = useCollectionData(journalsQuery, { idField: "id" });
  const [newJournalEntry, setNewJournalEntry] = useState("");

  const addJournal = async () => {
    if (newJournalEntry.trim() !== "") {
      await addDoc(journalsRef, {
        text: newJournalEntry,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      setNewJournalEntry("");
    }
  };

  // declare UI here
  return (
    <View style={styles.container}>
      <FlatList data={journals} renderItem={({ item }) => <Text style={styles.journalItem}>{item.text}</Text>} keyExtractor={(journal) => journal.id} />
      <TextInput style={styles.input} placeholder="Hvad skete der i dag?" value={newJournalEntry} onChangeText={(text) => setNewJournalEntry(text)} multiline={true} numberOfLines={5}></TextInput>
      <TouchableOpacity onPress={addJournal} style={styles.button}>
        <Text style={styles.buttonText}>Tilføj</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
    marginBottom: 150,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#1D3557",
    borderWidth: 2,
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
  journalItem: {
    backgroundColor: "white",
    color: "black",
    width: screenWidth * 0.9,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
});
