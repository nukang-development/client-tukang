import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, Button} from 'react-native';
import * as Font from 'expo-font'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'
import {getIdTukang} from '../store/action'
import { Ionicons } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window')

export default function Login ({navigation}) {
    const dispatch = useDispatch()
    const [isReady, setReady] = useState(false)
    const [username, seetUsername] = useState('')
    const [password, setPassword] = useState('')

    
    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        .then(_ => {
            //AsyncStorage.getIte('namaKey')
            setReady(true)

        })
    }, [])

    function masuk(){
      let payload = {
          username,
          password
      }
      
      axios({
          method: "POST",
          url: 'http://54.255.251.4/tukang/login',
          data: payload
      })
      .then(({data}) => {
          dispatch(getIdTukang(data.id))
          console.log('sini');
          
          return AsyncStorage.setItem('access_token', data.access_token)
      })
      .then(_ => {
          navigation.navigate('Home')
      })
      .catch(err => console.log(err))
    }

    function fillUsername (e) {
        seetUsername(e)
    }
    function fillPassword (e) {
        setPassword(e)
    }

  if(isReady){
    return (
    <ScrollView style={{backgroundColor: "#fff"}}>
        <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={{uri: "https://i.imgur.com/m6fCmmW.png"}} style={styles.logo} />
          <Text style={styles.logoText}>NUKANG</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={28} color={'#FEA47F'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'#FEA47F'}
            underlineColorAndroid='transparent'
            onChangeText={fillUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={"lock-closed-outline"} size={28} color={'#FEA47F'}
            style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'#FEA47F'}
            underlineColorAndroid='transparent'
            onChangeText={fillPassword}
          />

        </View>
        <TouchableOpacity style={styles.login} onPress={masuk}>
            <Text style={styles.masuk}>Masuk</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
      

    )

    } else {
        return (
            <View>
                <Text>Loading..</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  logo: {
    width: WIDTH - 140,
    height: WIDTH - 140,
    // alignItems: "center",
    marginTop: 100
  },
  logoText: {
    color: '#1e272e',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
    opacity: 0.5
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 55,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255 ,255 ,255 , 0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  inputContainer: {
    marginTop: 10
  },
  eye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  login: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#FEA47F",
    justifyContent: "center",
    marginTop: 20
  },
  masuk: {
    color: 'rgba(255 ,255 ,255 , 0.7)',
    fontSize: 16,
    textAlign: "center"
  }
});