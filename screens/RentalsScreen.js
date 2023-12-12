import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles/styles.js";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";


// På denne skærm vil brugeren kunne se alle kommende udlejninger samt tidligere udlejninger.
// De vil også kunne se status for hver udlejning (afventende, accepteret, afvist osv.).
// I fremtiden vil vi tilføje funktionalitet til at give vurderinger og anmeldelser til andre brugere.

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