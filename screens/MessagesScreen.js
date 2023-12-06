import { Text, View } from 'react-native'
import React from 'react'
import { styles } from "../styles/styles.js";

// In this screen, the user will be able to see all the messages they have sent and received.
// A rental request will be sent as a message, and the owner of the item 
// will be able to accept or decline the request.

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MessagesScreen</Text>
    </View>
  )
}

export default MessagesScreen