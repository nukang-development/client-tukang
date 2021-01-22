import React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font'
import {Container, Form, Input, Item, Label, Button, Text} from 'native-base'
import { useEffect } from 'react';
import { useState } from 'react';
import {Ionicons} from '@expo/vector-icons'

export default function Login ({navigation}) {
    const [isReady, setReady] = useState(false)

    
    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        .then(_ => {
            setReady(true)
        })
    }, [])

    function masuk(){
        navigation.replace('Home')
    }

    if(isReady){
        return (
            <Container>
                <Form style={{marginBottom: 80}}>
                    <Item floatingLabel>
                        <Label >Username</Label>
                        <Input style={{marginTop: 10}} />
                    </Item>
                    <Item floatingLabel >
                        <Label>Password</Label>
                        <Input style={{marginTop: 10}}/>
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