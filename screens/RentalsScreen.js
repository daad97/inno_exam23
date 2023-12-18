import React, { useEffect, useState, useCallback } from "react";
import { getFirestore, collection, query, getDocs, updateDoc, where, doc } from "firebase/firestore";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Alert } from "react-native";
import { auth } from "../services/firebase";

const RentalsScreen = () => {
  const [rentals, setRentals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const db = getFirestore();

  const fetchRentals = useCallback(async () => {
    setRefreshing(true);
    try {
      const rentalsCollection = collection(db, "messages");
      const rentalsQuery = query(rentalsCollection, where("accepted", "==", true));
      const querySnapshot = await getDocs(rentalsQuery);
      const fetchedRentals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setRentals(fetchedRentals);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      Alert.alert("Error", "Failed to fetch rentals.");
    } finally {
      setRefreshing(false);
    }
  }, [db]);

  const finishRental = async (id) => {
    try {
      const docRef = doc(db, "messages", id);
      await updateDoc(docRef, {
        finished: true,
      });
      fetchRentals();
    } catch (error) {
      console.error("Error finishing rental:", error);
      Alert.alert("Error", "Failed to finish rental.");
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  return (
    <View>
      <FlatList
        data={rentals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>
                {item.item.make} {item.item.model}
              </Text>
              <Text style={styles.price}>{item.item.price} kr. per dag</Text>
              <Text style={styles.description}>{item.item.description}</Text>
              <Text style={styles.address}>Adresse: {item.item.address}</Text>
              {item.requestUserEmail === auth.currentUser.email &&<Text style={styles.price}>Ejerens email: {item.item.userEmail}</Text>}
              {item.requestUserEmail !== auth.currentUser.email &&<Text style={styles.price}>Lejerens email: {item.requestUserEmail}</Text>}
              {item.category && <Text style={styles.detail}>Kategori: {item.item.category}</Text>}
              {item.year && <Text style={styles.detail}>Fra år {item.item.year}</Text>}
              {item.finished && <Text style={styles.ownerText}>Lejemålet er afsluttet</Text>}
              {item.finished === false && item.userId !== auth.currentUser.uid && (
                <TouchableOpacity style={styles.rentalRequestButton} onPress={() => finishRental(item.id)}>
                  <Text style={styles.rentalRequestButtonText}>Afslut lejemålet</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchRentals} />}
      />
    </View>
  );
};

export default RentalsScreen;

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
    justifyContent: "center",
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  acceptButton: {
    backgroundColor: "rgba(40, 167, 70, 0.8)", // Grøn farve for accept
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Flex property for equal width
    marginHorizontal: 5,
  },
  rejectButton: {
    backgroundColor: "rgba(220, 53, 70, 0.8)", // Rød farve for reject
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Flex property for equal width
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
