import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, ScrollView, RefreshControl, Image, Dimensions } from 'react-native';
import {Card, CardItem, Container, Body, ListItem, Input, Item, CheckBox, Button, Text, View, Content, Icon} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import {setTokenTukang} from '../store/action'

const { width: WIDTH } = Dimensions.get('window')

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
            url: 'http://54.255.251.4/tukang/order/'+ idTukang,
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

  function ReactNativeNumberFormat({ value }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp.'}
        renderText={formattedValue => <Text>{formattedValue}</Text>} // <--- Don't forget this!
      />
    );
  }

  function refetch(){
    console.log(token, '<<<<< token')
    console.log(idTukang, '<<<<< tukang')
    axios({
      method: 'GET',
      url: 'http://54.255.251.4/tukang/order/'+ idTukang,
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
      url: `http://54.255.251.4/tukang/order/${id}/accepted`,
      headers: {access_token: token},
    })
    .then(_=>{
      setAction(true)
      setStatus('accepted')
      refetch()
    })
    .catch(err => console.log(err))
  }
  console.log(dataOrder, "<<<<<<<< dataOrder")

  function dropOrder(id) {
    axios({
      method: 'put',
      url: `http://54.255.251.4/tukang/order/${id}/rejected`,
      headers: {access_token: token},
    })
    .then(_=>{
      setAction(true)
      setStatus('rejected')
      refetch()
    })
    .catch(err => console.log(err))
  }
  // console.log(dataOrder, '<<<<<order')

  return (
    <ScrollView
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ScrollView >
        {
          dataOrder.length > 0  &&
          dataOrder.map((data, i) => {
            return(
              <Card key={i} style={{backgroundColor: "#ddd", borderBottomRightRadius: 30, borderTopRightRadius: 30}}>
                <View style={{padding: 10, marginTop: 10}}>
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
                          Total: 
                      </Text>
                      <View >
                        <ReactNativeNumberFormat value={data.total_price}/>
                      </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center'}}>
                        {
                          data.status === 'pending' && <>
                            <Button iconLeft small rounded info onPress={()=> takeOrder(data._id)} style={{marginRight: 15, width: 120, height: 40, justifyContent: "center", alignItems: 'center', backgroundColor: "#58B19F", marginBottom: 10}} >
                              <Icon name={'checkmark-circle-outline'} size={3} />
                              <Text>Ambil</Text>
                            </Button>
                            <Button iconLeft small rounded danger onPress={() => dropOrder(data._id)} style={{width: 120, height: 40, justifyContent: "center", alignItems: 'center', marginBottom: 10}} >
                              <Icon name={'close-circle-outline'} size={3} />
                              <Text >Tolak</Text>
                            </Button>
                        </> 
                        }
                        {
                          data.status === 'accepted' &&
                            <ListItem >
                            <CheckBox checked={true} />
                              
                                <Text style={{fontSize: 20, color: 'blue'}}> Anda menerima proyek ini</Text>
                          </ListItem>
                        }
                        {
                          data.status === 'rejected' &&
                            <ListItem >
                            {/* <CheckBox checked={false} /> */}
                              
                                <Text style={{fontSize: 20, color: 'red'}}> Anda menolak proyek ini</Text>
                          </ListItem>
                        }
                        {
                          data.status === 'done' &&
                            <ListItem >
                            <CheckBox checked={false} color="green" />
                              
                                <Text style={{fontSize: 20, color: 'blue'}}> Proyek telah selesai</Text>
                          </ListItem>
                        }
                        
                    </View>             
                </View>
              </Card>
                
            ) 
          })
        }
        {
            dataOrder.length === 0 && 
            <View style={styles.logoContainer}>
              <Image source={{uri: 'https://i.imgur.com/ewkTH1l.png'}} style={styles.gambar} />
              <Text style={styles.logoText}>Anda belum ada orderan</Text>
            </View>
        }
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    width: null,
    height: null,
    alignItems: 'center',
    marginTop: 40
  
  },
  gambar: {
    width: WIDTH - 140,
    height: WIDTH - 140,
    marginTop: 120,
    // backgroundColor: "red"
  },
  logoText: {
    color: '#1e272e',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 20,
    textAlign: "center"
  },
  btn: {
    // paddingBottom:100,
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40
  },
  btnEdit: {
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: "#74b9ff", 
    justifyContent: "center",
    width: 100,
    height: 50,
    alignItems: 'center',
  },
})

{/* <Text style={{color:"blue"}}>{data.status}</Text> */}