import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import Edit from './src/screens/Edit'
import Chat from './src/screens/Chat'
import store from './src/store'
import {Provider}  from 'react-redux'

//192.168.1.6

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer  >
      <Provider store={store} >
        <Stack.Navigator >
          <Stack.Screen name='Login'component={Login}  options={{headerTitleAlign: 'center', headerShown: false}}/>
          <Stack.Screen name='Home'component={Home} options={{headerTitleAlign: 'center', headerShown: false}}/>
          <Stack.Screen name='Profile'component={Profile}  options={{headerTitleAlign: 'center'}}/>
          <Stack.Screen name='Edit'component={Edit} options={{headerTitleAlign: 'center', headerTintColor: "blue"}} />
          <Stack.Screen name='Chat'component={Chat}  options={{headerTitleAlign: 'center'}}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
    
}


