import React from 'react';
import { StyleSheet } from 'react-native';
import {Card, CardItem, Container, Body, Form, Input, Item, Label, Button, Text, View} from 'native-base'
import Orderan from '../Components/Orderan'
import Pesan from '../Components/Pesan'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

  
  

export default function Home ({navigation}) {

    const Tab = createMaterialTopTabNavigator()

    function toProfile(){
        navigation.push('Profile')
    }

    return (
        <>
        <View >
            <Button onPress={toProfile} full warning>
                <Text style={{color:'black'}} >Profile</Text>
            </Button>
        </View>
        <Tab.Navigator>
          <Tab.Screen name="Pesan" component={Pesan} />
          <Tab.Screen name="Orderan" component={Orderan} />
        </Tab.Navigator>
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