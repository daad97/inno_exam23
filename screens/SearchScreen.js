import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { Text, View, FlatList, TextInput, StyleSheet } from "react-native";

const SearchScreen = () => {
  const db = getFirestore();
  const itemsRef = collection(db, "items");
  const q = query(itemsRef);

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    const querySnapshot = await getDocs(q);
    const itemsData = querySnapshot.docs.map((doc) => doc.data());
    setItems(itemsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter((item) => {
    return item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Søg efter kategori"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.newsBadge}>Nyhed!</Text>
            <Text style={styles.title}>
              {item.make} {item.model}
            </Text>
            <Text style={styles.price}>{item.price} kr. per dag</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.adress}>Adresse: {item.adress}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detail}>{item.category}</Text>
              <Text style={styles.detail}>Fra år: {item.year}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5
  },
  newsBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 22,
    color: 'red',
    marginVertical: 5,
  },
  detail: {
    fontSize: 18,
    color: 'gray',
    marginRight: 5
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchScreen;
