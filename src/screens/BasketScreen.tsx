import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useBasket} from '../context/BasketContext';
import {BasketItem} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation'; // Import the navigation type

// Define the type for the navigation prop
type BasketScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BasketScreen'
>;

interface BasketScreenProps {
  navigation: BasketScreenNavigationProp; // Use the correct type for the navigation prop
}

const BasketScreen: React.FC<BasketScreenProps> = ({navigation}) => {
  const {state, dispatch} = useBasket();

  const updateQuantity = (item: BasketItem, quantity: number) => {
    dispatch({type: 'UPDATE_QUANTITY', payload: {id: item.id, quantity}});
  };

  const removeItem = (item: BasketItem) => {
    dispatch({type: 'REMOVE_ITEM', payload: item});
  };

  return (
    <View>
      <Text>Basket</Text>
      <FlatList
        data={state.basket}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Button
              title="Increase Quantity"
              onPress={() => updateQuantity(item, item.quantity + 1)}
            />
            <Button
              title="Decrease Quantity"
              onPress={() => updateQuantity(item, item.quantity - 1)}
            />
            <Button title="Remove" onPress={() => removeItem(item)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default BasketScreen;
