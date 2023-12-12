import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button } from "react-native";
import { styles } from "../styles/styles.js";
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
    <View style={styles.container}>
      <Text>{item.data.message}</Text>
      <Button title="Bekræft" onPress={() => handleAccept(item.id)} />
      <Button title="Afvis" onPress={() => handleDecline(item.id)} />
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
