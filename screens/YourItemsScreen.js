import { Modal, View, Text, TextInput, TouchableOpacity, Button, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles.js";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../services/firebase";
import { auth } from "../services/firebase.js";
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";

// In this screen, the user will be able to see all the items they have listed for rent.
// They will also be able to add new items to the list, and edit or delete existing items.
// When listing an item, the user has to fill out a form with datails about the item.
// Details include: model, make, description, category, price (per day in DKK), adress, and pictures.

// In the future, we will add calendar functionality to show when the item is available for rent.
const YourItemsScreen = () => {
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [adress, setAdress] = useState("");
  const [pictures, setPictures] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

<<<<<<< HEAD
  const handleAddListing = async () => {
=======
  const handleListing = async () => {
>>>>>>> 21238f9f01c1c8e805843bb694f96ca5d9b69bfe
    try {
      const db = getFirestore();

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
<<<<<<< HEAD
      // Knappen åbner et modal
      <Button title="Tilføj genstand" onPress={() => setModalVisible(true)} />
      // Et modal er et view, der 'popper' op ovenpå det eksisterende view.
      // Modalen indeholder en formular, hvor brugeren kan indtaste information om den genstand, de vil udleje.
=======
      <Button title="Tilføj genstand" onPress={() => setModalVisible(true)} />
>>>>>>> 21238f9f01c1c8e805843bb694f96ca5d9b69bfe
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

<<<<<<< HEAD
          <Button title="Opret udlejningsgenstand" onPress={handleAddListing} />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Annulér</Text>
          </TouchableOpacity>
=======
          <Button title="Opret udlejningsgenstand" onPress={handleListing} />
>>>>>>> 21238f9f01c1c8e805843bb694f96ca5d9b69bfe
        </View>
      </Modal>
    </View>
  );
};

export default YourItemsScreen;
