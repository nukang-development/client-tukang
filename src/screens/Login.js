import React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font'
import {Container, Form, Input, Item, Label, Button, Text} from 'native-base'
import { useEffect } from 'react';
import { useState } from 'react';
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'
import {getIdTukang} from '../store/action'

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
        //axios
        //AsyncStorage.setItem('namaKey', valuenya)
        let payload = {
            username,
            password
        }
        axios({
            method: "POST",
            url: 'http://192.168.1.7:3000/tukang/login',
            data: payload
        })
        .then(({data}) => {
            dispatch(getIdTukang(data.id))
            console.log('sini');
            
            return AsyncStorage.setItem('access_token', data.access_token)
        })
        .then(_ => {
            navigation.replace('Home')
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
            <Container>
                <Form style={{marginBottom: 80}}>
                    <Item floatingLabel>
                        <Label >Username</Label>
                        <Input onChangeText={fillUsername} style={{marginTop: 10}} />
                    </Item>
                    <Item floatingLabel >
                        <Label>Password</Label>
                        <Input onChangeText={fillPassword} secureTextEntry={true} style={{marginTop: 10}}/>
                    </Item>
                </Form>
                <Button onPress={masuk} block success>
                    <Text>Masuk</Text>
              </Button>
            </Container>
    
        )

    } else {
        return (
            <Container>
                <Text>Loading..</Text>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });