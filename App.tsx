import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BasketProvider} from './src/context/BasketContext';
import HomeScreen from './src/screens/HomeScreen';
import BasketScreen from './src/screens/BasketScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <BasketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BasketScreen" component={BasketScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BasketProvider>
  );
};

export default App;
