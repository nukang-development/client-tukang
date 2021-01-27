import React from 'react';
import { LogBox, StyleSheet } from 'react-native';
import Orderan from '../Components/Orderan'
import Pesan from '../Components/Pesan'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'
import {Button, Text} from 'native-base'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

  
  

export default function Home ({navigation}) {
  LogBox.ignoreLogs(['source.uri should not be an empty string'])
    const Tab = createMaterialTopTabNavigator()

    // function toProfile(){
    //     navigation.push('Profile')
    // }
    function toChat () {
      navigation.navigate('Chat')
    }

    return (
        <>
        <Tab.Navigator style={{marginTop: 20}}>
          <Tab.Screen name="Orderan" component={Orderan} />
          <Tab.Screen name="Profile" component={Profile} />
          {/* <Tab.Screen name="Pesan" component={Chat} /> */}
        </Tab.Navigator>
        <Button  onPress={toChat} block>
          <Text>Chat</Text></Button>
        </>
      );

    
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });