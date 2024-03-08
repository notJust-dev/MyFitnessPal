import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';

const mutation = gql`
  mutation MyMutation(
    $food_id: String!
    $kcal: Int!
    $label: String!
    $user_id: String!
  ) {
    insertFood_log(
      food_id: $food_id
      kcal: $kcal
      label: $label
      user_id: $user_id
    ) {
      created_at
      food_id
      id
      kcal
      label
      user_id
    }
  }
`;

const FoodListItem = ({ item }) => {
  const [logFood] = useMutation(mutation, {
    refetchQueries: ['foodLogsForDate'],
  });
  const router = useRouter();

  const onPlusPressed = async () => {
    await logFood({
      variables: {
        food_id: item.food.foodId,
        kcal: item.food.nutrients.ENERC_KCAL,
        label: item.food.label,
        user_id: 'vadim',
      },
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {item.food.label}
        </Text>
        <Text style={{ color: 'dimgray' }}>
          {item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}
        </Text>
      </View>
      <AntDesign
        onPress={onPlusPressed}
        name="pluscircleo"
        size={24}
        color="royalblue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f8',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FoodListItem;
