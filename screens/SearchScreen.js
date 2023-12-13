import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { Text, View, FlatList, TextInput, StyleSheet } from 'react-native';


const SearchScreen = () => {
  const db = getFirestore();
  const itemsRef = collection(db, "items");
  const q = query(itemsRef);

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const querySnapshot = await getDocs(q);
    const itemsData = querySnapshot.docs.map((doc) => doc.data());
    setItems(itemsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter(item => {
    return item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Søg efter kategori"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemText}>{item.category}</Text>
              <Text style={styles.itemText}>{item.model}</Text>
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
    borderColor: '#ddd',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchScreen;
