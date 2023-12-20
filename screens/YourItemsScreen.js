import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Button, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../services/firebase";
import { auth } from "../services/firebase.js";
import {
  getDocs,
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

// På denne skærm kan brugeren se alle de genstande, de har sat til leje.
// De kan også tilføje nye genstande til listen og redigere eller slette eksisterende genstande.
// Når der oprettes en genstand, skal brugeren udfylde en formular med detaljer om genstanden.
// Detaljerne inkluderer: model, mærke, beskrivelse, kategori, pris (pr. dag i DKK), adresse og billeder.

// I fremtiden vil vi tilføje kalenderfunktionalitet for at vise, hvornår genstanden er tilgængelig til leje.
const YourItemsScreen = () => {
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [year, setYear] = useState("");
  const [pictures, setPictures] = useState([]);

  const db = getFirestore();
  const itemsRef = collection(db, "items");
  const q = query(itemsRef, where("userId", "==", auth.currentUser.uid));

  const [items, setItems] = useState([]);

  // Hent kun de genstande, der tilhører den aktuelle bruger
  const fetchData = async () => {
    const querySnapshot = await getDocs(q);
    const itemsData = querySnapshot.docs.map((doc) => doc.data());
    setItems(itemsData);
  };

  const currentUserMessages = items.filter(
    (item) =>
      item.userEmail === auth.currentUser.email || message.data.item.userEmail === auth.currentUser.email
  );

  useEffect(() => {
    fetchData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddListing = async () => {
    try {
      await addDoc(collection(db, "items"), {
        model: model,
        make: make,
        description: description,
        category: category,
        price: price,
        address: address,
        year: year,
        pictures: pictures,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
      });

      // Clear the form
      setModel("");
      setMake("");
      setDescription("");
      setCategory("");
      setPrice("");
      setAddress("");
      setYear("");
      setPictures([]);
    } catch (error) {
      console.warn("FirebaseError:", error);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
            {currentUserMessages.length === 0 && (
        // Hvis den aktuelle bruger ikke har nogen varer, så vises dette
        <View style={styles.card}>
          <Text style={styles.ownerText}>Du har ingen varer til udlejning</Text>
          <Text></Text>
        </View>
      )}
      {items.map((item, index) => (
        <View key={index}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.make} {item.model}
            </Text>
            <Text style={styles.price}>{item.price} kr. per dag</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.address}>Adresse: {item.address}</Text>
            {item.category && <Text style={styles.detail}>Kategori: {item.category}</Text>}
            {item.year && <Text style={styles.detail}>Fra år {item.year}</Text>}
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={fetchData} style={styles.buttonRow}>
        <Ionicons name="refresh" size={36} color="#007aff" />
      </TouchableOpacity>
      {/* Knappen åbner et modal */}
      <Button title="Tilføj genstand" onPress={() => setModalVisible(true)} />
      {/* Et modal er et view, der 'popper' op ovenpå det eksisterende view. 
      Modalen indeholder en opret genstand-formular */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={oldStyles.container}>
          <Text>Mærke:</Text>
          <TextInput value={make} onChangeText={setMake} style={oldStyles.input} />

          <Text>Model:</Text>
          <TextInput value={model} onChangeText={setModel} style={oldStyles.input} />

          <Text>Beskrivelse:</Text>
          <TextInput value={description} onChangeText={setDescription} style={oldStyles.input} />

          <Text>Kategori:</Text>
          <TextInput value={category} onChangeText={setCategory} style={oldStyles.input} />

          <Text>Pris (per dag):</Text>
          <TextInput value={price} onChangeText={setPrice} style={oldStyles.input} placeholder="DKK" />

          <Text>Adresse:</Text>
          <TextInput value={address} onChangeText={setAddress} style={oldStyles.input} placeholder="Vej, by, postnummer" />
          <Text>Årgang:</Text>
          <TextInput value={year} onChangeText={setYear} style={oldStyles.input} placeholder="Årgang" />
          <Button title="Opret udlejningsgenstand" onPress={handleAddListing} />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={oldStyles.cancelButton}>
            <Text style={oldStyles.buttonText}>Annulér</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default YourItemsScreen;

const oldStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "rgba(230, 57, 70, 0.8)",
    width: "60%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

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
