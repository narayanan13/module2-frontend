import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Notification from './screens/Notification';
import ProductForm from './screens/productForm';
import CategoryForm from './screens/categoryForm';
import Main from './screens/main';
import Scanner from './screens/scanner';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="ProductForm" component={ProductForm}/>
        <Stack.Screen name="Scanner" component={Scanner}/>
        <Stack.Screen name="CategoryForm" component={CategoryForm}/>
        <Stack.Screen name="Notification" component={Notification}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
