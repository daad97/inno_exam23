import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { styles } from "../styles/styles.js";

// In this screen the user will select the dates for the rental,
// and then the app will check if the item is available for rent on those dates.
// If it is, the user will be able to proceed to the next screen,
// where they will be able to message the owner of the item to arrange the rental.

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchItems = () => {
    // Implement your logic to search items here
  };

  return (
    <View style={styles.container}>
      <Text>Hvad skal du bruge?</Text>
      <TextInput style={styles.input} value={searchTerm} onChangeText={setSearchTerm} placeholder="Skriv navn på produkt" />
      <Button title="Søg" onPress={searchItems} />
    </View>
  );
};

export default SearchScreen;
