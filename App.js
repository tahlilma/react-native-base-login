import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

import LoginStack from './stacks/LoginStack'
import SignupStack from './stacks/SignupStack'
import HomeStack from './stacks/HomeStack'

import firebaseConfig from './firebaseConfig'
firebase.initializeApp(firebaseConfig)

const Stack = createStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginStack' screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen 
          name='LoginStack' 
          options={{ title: 'Login' }} 
          component={LoginStack} 
        />
        <Stack.Screen 
          name='SignupStack' 
          options={{ title: 'Sign Up', headerLeft: () => null }} 
          component={SignupStack} 
        />
        <Stack.Screen
          name='HomeStack'
          options={{ title: 'Home', headerLeft: () => null }}
          component={HomeStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

