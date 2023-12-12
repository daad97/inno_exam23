import { Modal, View, Text, TextInput, TouchableOpacity, Button, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles.js";
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
  const [adress, setAdress] = useState("");
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
        adress: adress,
        pictures: pictures,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });

      // Clear the form
      setModel("");
      setMake("");
      setDescription("");
      setCategory("");
      setPrice("");
      setAdress("");
      setPictures([]);
    } catch (error) {
      console.warn("FirebaseError:", error);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index}>
          <View style={styles.itemInList}>
            <Text>{item.category}</Text>
            <Text>: </Text>
            <Text>{item.make}</Text>
            <Text>, </Text>
            <Text>{item.model}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={fetchData}>
        <Ionicons name="refresh" size={36} color="#007aff" />
      </TouchableOpacity>
      {/* Knappen åbner et modal */}
      <Button title="Tilføj genstand" onPress={() => setModalVisible(true)} />
      {/* Et modal er et view, der 'popper' op ovenpå det eksisterende view. 
      Modalen indeholder en opret genstand-formular */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.container}>
          <Text>Mærke:</Text>
          <TextInput value={make} onChangeText={setMake} style={styles.input} />

          <Text>Model:</Text>
          <TextInput value={model} onChangeText={setModel} style={styles.input} />

          <Text>Beskrivelse:</Text>
          <TextInput value={description} onChangeText={setDescription} style={styles.input} />

          <Text>Kategori:</Text>
          <TextInput value={category} onChangeText={setCategory} style={styles.input} />

          <Text>Pris (per dag):</Text>
          <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder="DKK" />

          <Text>Adresse:</Text>
          <TextInput value={adress} onChangeText={setAdress} style={styles.input} placeholder="Vej, by, postnummer" />

          <Button title="Opret udlejningsgenstand" onPress={handleAddListing} />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Annulér</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default YourItemsScreen;
