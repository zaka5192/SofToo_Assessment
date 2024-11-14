import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {fetchProducts} from '../api/productsAPI';
import {useBasket} from '../context/BasketContext';
import {Product} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation'; // Import the navigation type

// Define the type for the navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp; // Use the correct type for the navigation prop
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const {dispatch} = useBasket();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const addToBasket = (product: Product) => {
    dispatch({type: 'ADD_ITEM', payload: {...product, quantity: 1}});
  };

  return (
    <View>
      <Text>Product List</Text>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Button title="Add to Basket" onPress={() => addToBasket(item)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button
        title="Go to Basket"
        onPress={() => navigation.navigate('BasketScreen')}
      />
    </View>
  );
};

export default HomeScreen;
