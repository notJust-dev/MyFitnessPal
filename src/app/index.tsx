import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import FoodListItem from '../components/FoodListItem';
import { useState } from 'react';

const foodItems = [
  { label: 'Pizza', cal: 75, brand: 'Dominos' },
  { label: 'Apple', cal: 50, brand: 'Generic' },
  { label: 'Coffee', cal: 100, brand: 'Americano' },
  { label: 'Coffee', cal: 100, brand: 'Americano' },
];

export default function App() {
  const [search, setSearch] = useState('');

  const performSearch = () => {
    console.warn('Searching for: ', search);

    setSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.input}
      />
      {search && <Button title="Search" onPress={performSearch} />}

      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
  },
});
