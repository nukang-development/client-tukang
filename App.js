import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import Edit from './src/screens/Edit'

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name='Login'component={Login}  options={{headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Home'component={Home}  options={{headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Profile'component={Profile}  options={{headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Edit'component={Edit}  options={{headerTitleAlign: 'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
    
}


