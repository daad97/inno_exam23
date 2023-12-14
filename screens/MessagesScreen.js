import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// I denne skærm kan brugeren se alle de beskeder, de har sendt og modtaget.
// En lejeanmodning vil blive sendt som en besked, og så vil ejeren af ​​genstanden
// have mulighed for at acceptere eller afvise anmodningen.

const MessagesScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>{item.data.message}</Text>
      <Text></Text>
      <Text>Lejers email: {item.data.reqestUserEmail}</Text>
      <Button title="Bekræft" onPress={() => handleAccept(item.id)} />
      <Button title="Afvis" onPress={() => handleDecline(item.id)} />
    </View>
  );

  const handleAccept = (message) => {
    // Handle acceptance of the rental request
  };

  const handleDecline = (message) => {
    // Handle decline of the rental request
  };

  return (
    <View style={styles.container}>
      <FlatList data={messages} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchBar: {
    fontSize: 18,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  newsBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    color: "white",
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 22,
    color: "red",
    marginVertical: 5,
  },
  detail: {
    fontSize: 18,
    color: "gray",
    marginRight: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemText: {
    fontSize: 16,
  },
  rentalRequestButton: {
    backgroundColor: "#007bff", // Example blue background
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  rentalRequestButtonText: {
    color: "white",
    fontSize: 16,
  },
  ownerText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
});
