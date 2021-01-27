import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import {Card, CardItem, Container, Body, View, Thumbnail, Button, Text, Content, Left, List, ListItem} from 'native-base'
import Porto from '../Components/Porto'
import ProjectDesc from '../Components/Proyek'
import {useSelector, useDispatch} from 'react-redux'
import {getTukang} from '../store/action'
import axios from 'axios';



export default function Profile({navigation}){
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const idTukang = useSelector(state => state.idTukang)
    const [refreshing, setRefreshing] = useState(false);

    const [dataTukang, setDataTukang] = useState({
        big_project_desc: '',
        big_project_price: 0,
        category: '',
        id: '',
        location:'' ,
        medium_project_desc: '',
        medium_project_price: 0,
        name: '',
        portofolio_img: [],
        small_project_desc: '',
        small_project_price: 0,
    })
    const [project, setProject] = useState(
      {
        small_project_desc: '',
        small_project_price: '',
        medium_project_desc: '',
        medium_project_price: '',
        big_project_desc: '',
        big_project_price: ''
      }
    )
    const [ava, setAva] = useState('')

    function toEdit(){
        navigation.push('Edit')
    }

    useEffect(() => {
      axios({
        method: 'GET',
        url: 'http://192.168.1.7:3000/tukang/' + idTukang,
        headers: {access_token: token}
      })
      .then(({data}) => {
        setDataTukang(data)
        dispatch(getTukang(data))
        let payload = {
          small_project_desc: data.small_project_desc,
          small_project_price: data.small_project_price,
          medium_project_desc: data.medium_project_desc,
          medium_project_price: data.medium_project_price,
          big_project_desc: data.big_project_desc,
          big_project_price: data.big_project_price
        }
        if(data.avatar_img){
          setAva(data.avatar_img)
        }
        setProject(payload)
      })
      .catch(err => console.log(err))
    },[])
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
        url: 'http://192.168.1.7:3000/tukang/' + idTukang,
        headers: {access_token: token}
      })
      .then(({data}) => {
        setDataTukang(data)
        dispatch(getTukang(data))
        let payload = {
          small_project_desc: data.small_project_desc,
          small_project_price: data.small_project_price,
          medium_project_desc: data.medium_project_desc,
          medium_project_price: data.medium_project_price,
          big_project_desc: data.big_project_desc,
          big_project_price: data.big_project_price
        }
        if(data.avatar_img){
          setAva(data.avatar_img)
        }
        setProject(payload)
      })
      .catch(err => console.log(err))
  }
    
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          <Container >
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  {
                    dataTukang.avatar_img ? <Thumbnail source={{uri: ava}}  large /> : <Thumbnail large source={{uri:'https://image.freepik.com/free-vector/faceless-human-model-blank-dummy-part-male-female-body-isolated-background_1441-2248.jpg'}} />
                  }
                  
                  <Body>
                    <Text style={{fontSize: 20}}>{dataTukang.name ? dataTukang.name : 'edit your name'}</Text>
                    <Text style={{fontSize: 13}}>{dataTukang.category ? 'Tukang '+  dataTukang.category : 'pilih jenis tukang'}</Text>
                    <Text style={{fontSize: 13}} note>{dataTukang.location ? dataTukang.location : 'isi Kota di edit'}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <View style={{marginTop: 10}}>
                  <Text style={{alignSelf:'center', marginBottom: 10}}>Portofolio</Text>
              {/* {
                dataTukang.portofolio_img ?  <Porto data={dataTukang.portofolio_img} /> :  <Porto />
              }
              {
                project ? <ProjectDesc data={project} /> : <ProjectDesc />
              } */}
              <Porto data={dataTukang.portofolio_img} />

              <List>
                <ListItem>
                  <Text>Proyek Kecil {project.small_project_price ? 'Rp. '+project.small_project_price+' /m' : 'silahkan edit harga' }{'\n'}<Text note>{project.small_project_desc ? project.small_project_desc : 'sialhkan edit keterangan' }</Text></Text>
                </ListItem>
                  
                <ListItem>
                <Text>Proyek Sedang {project.medium_project_price ? 'Rp. '+project.medium_project_price+' /m' : 'silahkan edit harga' }{'\n'}<Text note>{project.medium_project_desc ? project.medium_project_desc : 'sialhkan edit keterangan' }</Text></Text>
                  
                </ListItem>
                <ListItem>
                <Text>Proyek Besar {project.big_project_price ? 'Rp. '+project.big_project_price+' /m' : 'silahkan edit harga' }{'\n'}<Text note>{project.big_project_desc ? project.big_project_desc : 'sialhkan edit keterangan' }</Text></Text>
                  
                </ListItem>
              </List>
            <Button style={{paddingBottom:15}} onPress={toEdit} block info>
              <Text>Edit</Text>
            </Button>
            </View>
          </Content>
        </Container>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });