import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import FoodListItem from '../components/FoodListItem';
import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const query = gql`
  query search($ingr: String) {
    search(ingr: $ingr) {
      text
      hints {
        food {
          label
          brand
          foodId
          nutrients {
            ENERC_KCAL
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const [runSearch, { data, loading, error }] = useLazyQuery(query);

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });
    // setSearch('');
  };

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  if (error) {
    return <Text>Failed to search</Text>;
  }

  const items = data?.search?.hints || [];

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.input}
      />
      {search && <Button title="Search" onPress={performSearch} />}

      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>}
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
