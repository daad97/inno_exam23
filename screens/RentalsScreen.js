import { View, Text } from 'react-native'
import React from 'react'
import { styles } from "../styles/styles.js";

// In this screen, the user will be able to see all upcoming rentals, as well as past rentals.
// They will also be able to see the status of each rental (pending, accepted, declined, etc.).
// In the future, we will add functionality to give ratings and reviews to other users.

const RentalsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>RentalsScreen</Text>
    </View>
  )
}

export default RentalsScreen