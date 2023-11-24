import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native'
import MovieScreen from '../screens/MovieScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' options={{headerShown: false}} component={HomeScreen}/>
            <Stack.Screen name='Movie' options={{headerShown: false}} component={MovieScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}