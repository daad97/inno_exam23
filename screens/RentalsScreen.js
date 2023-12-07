import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles/styles.js";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";


// In this screen, the user will be able to see all upcoming rentals, as well as past rentals.
// They will also be able to see the status of each rental (pending, accepted, declined, etc.).
// In the future, we will add functionality to give ratings and reviews to other users.

const RentalsScreen = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, "rentals"), (snapshot) => {
      setRentals(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text>{item.data.itemName}</Text>
      <Text>Status: {item.data.status}</Text>
      <Text>Start Date: {item.data.startDate}</Text>
      <Text>End Date: {item.data.endDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={rentals} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default RentalsScreen;