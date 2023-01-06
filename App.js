import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigators/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Navigation'
      >
        <Stack.Screen name={'Navigation'} component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
