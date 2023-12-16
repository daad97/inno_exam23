import React, { useEffect, useState, useCallback } from "react";
import { getFirestore, collection, query, getDocs, updateDoc, where, doc } from "firebase/firestore";
import { Button, Text, View, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { auth } from "../services/firebase.js";

const MessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const db = getFirestore();

  const fetchMessages = useCallback(async () => {
    setRefreshing(true);
    const messagesCollection = collection(db, "messages");
    const querySnapshot = await getDocs(messagesCollection);
    const fetchedMessages = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    setMessages(fetchedMessages);
    setRefreshing(false);
  }, [db]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleAccept = async (id) => {
    const docRef = doc(db, "messages", id);
    await updateDoc(docRef, {
      accepted: true,
      rejected: false,
    });
    fetchMessages();
  };

  const handleReject = async (id) => {
    const docRef = doc(db, "messages", id);
    await updateDoc(docRef, {
      accepted: false,
      rejected: true,
    });
    fetchMessages();
  };

  const currentUserMessages = messages.filter(
    (message) =>
      message.data.requestUserEmail === auth.currentUser.email || message.data.item.userEmail === auth.currentUser.email
  );

  return (
    <View style={styles.container}>
      {currentUserMessages.length === 0 && (
        // Hvis den aktuelle bruger ikke er forbundet med nogen anmodninger, så vises dette
        <View style={styles.card}>
          <Text style={styles.ownerText}>Du har ikke sendt eller modtaget nogen anmodninger</Text>
          <Text></Text>
        </View>
      )}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            {item.data.requestUserEmail === auth.currentUser.email ? (
              // Hvis den aktuelle bruger er anmoderen, så vises dette
              <View style={styles.card}>
                <Text>Anmoder: {item.data.requestUserEmail}</Text>
                <Text></Text>
                <Text>
                  Du har anmodet om at leje {item.data.item.make} {item.data.item.model}
                </Text>
                <Text></Text>
                <Text>Ejerens email: {item.data.item.userEmail}</Text>
                <View style={styles.detailsRow}>
                  {item.data.accepted ? (
                    <Text>Status: Accepteret</Text>
                  ) : item.data.rejected ? (
                    <Text>Status: Afslået</Text>
                  ) : (
                    <Text>Status: Afventer svar</Text>
                  )}
                </View>
              </View>
            ) : item.data.item.userEmail === auth.currentUser.email ? (
              // Hvis den aktuelle bruger er ejeren, så vises dette
              <View style={styles.card}>
                <Text>Anmoder: {item.data.requestUserEmail}</Text>
                <Text></Text>
                <Text>{item.data.message}</Text>
                <Text></Text>
                <Text>Ejerens email: {item.data.item.userEmail}</Text>
                <View style={styles.detailsRow}>
                  {item.data.accepted ? (
                    <Text>Status: Accepteret</Text>
                  ) : item.data.rejected ? (
                    <Text>Status: Afslået</Text>
                  ) : (
                    <Text>Status: Afventer svar</Text>
                  )}
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item.id)}>
                    <Text style={styles.buttonText}>Bekræft</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item.id)}>
                    <Text style={styles.buttonText}>Afvis</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchMessages} />}
      />
    </View>
  );
};

export default MessagesScreen;

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
