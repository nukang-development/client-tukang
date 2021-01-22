import React from 'react';
import { StyleSheet } from 'react-native';
import {Card, CardItem, Container, Body, View, Input, Thumbnail, Label, Button, Text, Content, Left} from 'native-base'
import Porto from '../Components/Porto'
import ProjectDesc from '../Components/Proyek'



export default function Profile({navigation}){

    function toEdit(){
        navigation.push('Edit')
    }
    
    return (
        <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail large source={{uri: 'https://cdn.pixabay.com/photo/2017/09/18/16/11/building-2762241_960_720.jpg'}} />
                <Body>
                  <Text style={{fontSize: 20}}>C.Ronaldo</Text>
                  <Text style={{fontSize: 13}}>Tukang Bangunan</Text>
                  <Text style={{fontSize: 13}} note>Kota Hacktiv8</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <View style={{marginTop: 10}}>
                <Text style={{alignSelf:'center', marginBottom: 10}}>Portofolio</Text>
            <Porto />
            <ProjectDesc />
          <Button onPress={toEdit} block info>
            <Text>Edit</Text>
          </Button>
          </View>
        </Content>
      </Container>
    )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });