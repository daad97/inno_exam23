import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button } from "react-native";
import { styles } from "../styles/styles.js";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// In this screen, the user will be able to see all the messages they have sent and received.
// A rental request will be sent as a message, and the owner of the item
// will be able to accept or decline the request.

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
    <View style={styles.container}>
      <Text>{item.data.message}</Text>
      <Button title="Accept" onPress={() => handleAccept(item.id)} />
      <Button title="Decline" onPress={() => handleDecline(item.id)} />
    </View>
  );

  const handleAccept = (id) => {
    // Handle acceptance of the rental request
  };

  const handleDecline = (id) => {
    // Handle decline of the rental request
  };

  return (
    <View style={styles.container}>
      <FlatList data={messages} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default MessagesScreen;
