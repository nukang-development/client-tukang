import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import {Card, CardItem, Container, Body, Form, Input, Item, Label, Button, Text, View, Content} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setTokenTukang} from '../store/action'



export default function Orderan({navigation, id}) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const [action, setAction] = useState(false)
    const [dataOrder, setDataOrder] = useState([])
    // const [idTukang, setIdTukang] = useState('')
    const idTukang = useSelector(state => state.idTukang)
    const[token, setToken] = useState('')
    const [status, setStatus] = useState('pending')

    useEffect(() => {
        console.log('fetch')

        AsyncStorage.getItem('access_token')
        .then(data => {
            setToken(data)
            dispatch(setTokenTukang(data))
            return axios({
                method: 'GET',
                url: 'http://192.168.1.7:3000/tukang/order/'+ idTukang,
                headers: {access_token: data}
            })
        })   
        .then(({data}) => {
            console.log('token masuk');
            setDataOrder(data)
        })
        .catch(err => console.log('zZzz',err))


    }, [])
    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(800)
        //refetch data
        .then(() => {
            refetch()
            setRefreshing(false)
        })
    }, [])
    function refetch(){
        axios({
            method: 'GET',
            url: 'http://192.168.1.7:3000/tukang/order/'+ idTukang,
            headers: {access_token: token}
        })   
        .then(({data}) => {
            console.log('token masuk');
            setDataOrder(data)
        console.log('ngerefetch');

        })
        .catch(err => console.log('zZzz',err))
    }

    function takeOrder(id) {
        axios({
            method: 'put',
            url: `http://192.168.1.7:3000/tukang/order/${id}/accepted`,
            headers: {access_token: token},
        })
        .then(_=>{
            setAction(true)
            setStatus('accepted')
            refetch()
        })
        .catch(err => console.log(err))
    }
    function dropOrder(id) {
        axios({
            method: 'put',
            url: `http://192.168.1.7:3000/tukang/order/${id}/rejected`,
            headers: {access_token: token},
        })
        .then(_=>{
            setAction(true)
            setStatus('rejected')
        })
        .catch(err => console.log(err))
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Container>
                {/* mapping orderan dari sini, kasih kondisi status orderan, if rejected ga usah ditampilin */}
                {
                    dataOrder.length > 0  &&
                    dataOrder.map((data, i) => {
                        return(
                            <Card key={i}>
                                <View style={{padding: 10}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                            {data.userName}
                                        </Text>
                                        <Text style={{fontWeight: 'bold'}}>
                                            {data.schedule}
                                        </Text>
                                    </View>
                                    <Text style={{marginTop: 10}}>
                                        {data.address}
                                    </Text>
                                    <Text style={{marginTop: 15}}>
                                        No. Handphone:
                                    </Text>
                                    <Text style={{fontWeight:'bold'}}>
                                        {data.contact}
                                    </Text>
                                    <Text>
                                        Total: {data.total_price}
                                    </Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                        {
                                            data.status === 'pending' ? <>
                                                        <Button onPress={()=> takeOrder(data._id)} style={{marginRight: 15, paddingHorizontal: 30}} rounded success>
                                                            <Text>Take</Text>
                                                        </Button>
                                                        <Button onPress={() => dropOrder(data._id)} style={{paddingHorizontal: 30}} rounded light>
                                                            <Text >Drop</Text>
                                                        </Button>
                                            
                                                    </> : <Text>{data.status}</Text>
                                        }
                                    </View>             
                                </View>
                            </Card>
                           
                        ) 
                    })
                }
                {
                     dataOrder.length === 0 && 
                     <Text>Belum ada Orderan</Text>
                }
        </Container>
      </ScrollView>
    );
  }