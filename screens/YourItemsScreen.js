import { Text, View } from 'react-native'
import React from 'react'
import { styles } from "../styles/styles.js";

// In this screen, the user will be able to see all the items they have listed for rent.
// They will also be able to add new items to the list, and edit or delete existing items.
// In the future, we will add calendar functionality to show when the item is available for rent.
// When listing an item, the user has to fill out a form with datails about the item.
// Details include: model, make, description, category, price (per day in DKK), location, and pictures.

const YourItemsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>YourItemsScreen</Text>
    </View>
  )
}

export default YourItemsScreen