import React from 'react';
import {SafeAreaView } from 'react-native-safe-area-context'
import { LogBox, StyleSheet, View } from 'react-native';
import Orderan from '../Components/Orderan'
import Pesan from '../Components/Pesan'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'
import {Button, Text, Icon} from 'native-base'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { Ionicons } from '@expo/vector-icons';

export default function Home ({navigation}) {
  LogBox.ignoreLogs(['source.uri should not be an empty string'])
    const Tab = createMaterialTopTabNavigator()

  return (

    <SafeAreaView style={styles.container}>
      <Tab.Navigator 
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Orderan') {
              iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
            return <Icon style={{width: 100}} name={'hammer-outline'} size={3}/>;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            return <Icon style={{width: 100}} name={'person-outline'} size={20}/>;
            }
          },
        })}
        tabBarOptions={{
          showIcon:true,
          showLabel:false,
          activeTintColor: '#e91e63',
          inactiveTintColor: 'gray',
          style: { height: 50, backgroundColor:"#f7f1e3" }
        }}

      >
        <Tab.Screen name="Orderan" component={Orderan} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });