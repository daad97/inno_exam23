import { Text, View } from "react-native";
import React from "react";
import { styles } from "../styles/styles.js";

// In this screen the user will select the dates for the rental,
// and then the app will check if the item is available for rent on those dates.
// If it is, the user will be able to proceed to the next screen,
// where they will be able to message the owner of the item to arrange the rental.

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
