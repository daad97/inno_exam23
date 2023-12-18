import React, { useEffect, useState } from "react";
import { addDoc, getFirestore, collection, query, getDocs, where } from "firebase/firestore";
import { Button, Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { auth } from "../services/firebase.js";

const SearchScreen = () => {
  const db = getFirestore();
  const itemsRef = collection(db, "items");
  const q = query(itemsRef);

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const querySnapshot = await getDocs(q);
    const itemsData = querySnapshot.docs.map((doc) => doc.data());
    setItems(itemsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const filteredItems = items.filter((item) => {
    return item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRentalRequest = async (item) => {
    console.log(item);
    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      message: `Hej, jeg vil gerne leje din "${item.make} ${item.model}"`,
      item: item,
      itemOwnerUserId: item.userId,
      requestUserId: auth.currentUser.uid,
      requestUserEmail: auth.currentUser.email,
      accepted: false,
      rejected: false,
      finished: false,
    });
    alert("Din anmodning er sendt");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Søg efter kategori"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.newsBadge}>Nyhed!</Text>
            <Text style={styles.title}>
              {item.make} {item.model}
            </Text>
            <Text style={styles.price}>{item.price} kr. per dag</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.address}>Adresse: {item.address}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detail}>{item.category}</Text>
              {item.year && <Text style={styles.detail}>Fra år {item.year}</Text>}
            </View>
            {item.userId == auth.currentUser.uid && <Text style={styles.ownerText}>Du ejer denne vare</Text>}
            {item.userId !== auth.currentUser.uid && (
              <TouchableOpacity style={styles.rentalRequestButton} onPress={() => handleRentalRequest(item)}>
                <Text style={styles.rentalRequestButtonText}>Send lejeanmodning</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

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

export default SearchScreen;
