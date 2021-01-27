// @refresh reset
import React, {useState, useEffect, useCallback} from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, Text, LogBox ,Button } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import {useSelector} from 'react-redux'



const firebaseConfig = {
    apiKey: "AIzaSyCysAS1kF1as2ku249k57a59ImrXOTwLI4",
    authDomain: "nukang-chat.firebaseapp.com",
    projectId: "nukang-chat",
    storageBucket: "nukang-chat.appspot.com",
    messagingSenderId: "10393288668",
    appId: "1:10393288668:web:f1e26d8b76ac127fcad919"
  };

  if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
  }

  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  
  export default function Chat(){
    const idTukang = useSelector(state => state.idTukang)
    const tukang = useSelector(state => state.tukang)

    
    const db = firebase.firestore()
    const chatsRef = db.collection(idTukang)
    const [user, setUser] = useState({
        _id: 'tukang'+idTukang,
        name: tukang.name
    })

    
    const [messages, setMessages] = useState([])
   

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
        const messageFirestore = querySnapshot
            .docChanges()
            .filter(({type}) => type === 'added')
            .map(({doc}) => {
                const message = doc.data()
                return {...message, createdAt: message.createdAt.toDate()}
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messageFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    }, [messages])

    async function readUser() {
        ///tunggu tukang.name ada
            // await setUser({
            //     _id: 'Tukang'+idTukang,
            //     name: tukang.name 
            // })
            await AsyncStorage.setItem('user',JSON.stringify(user) )
        
    }

    async function handlerSend(messages) {
        const writes = messages.map(m => chatsRef.add(m))
        await Promise.all(writes)
    }
    console.log('>>>>',user);
   
      
    return (
        <GiftedChat messages={messages} user={user} onSend={handlerSend} />
    )

  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: 'gray'

    }
  });