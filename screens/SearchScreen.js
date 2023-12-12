import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { styles } from "../styles/styles.js";

// På denne skærm vil brugeren vælge datoerne for udlejningen,
// og derefter vil appen kontrollere, om varen er tilgængelig til udlejning på disse datoer.
// Hvis den er det, vil brugeren kunne fortsætte til næste skærm,
// hvor de vil kunne sende besked til ejeren af varen for at arrangere udlejningen.

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchItems = () => {
    // Implement your logic to search items here
  };

  return (
    <View style={styles.container}>
      <Text>Hvad skal du bruge?</Text>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Skriv navn på produkt"
      />
      <Button title="Søg" onPress={searchItems} />
    </View>
  );
};

export default SearchScreen;
