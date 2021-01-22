import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Image } from 'react-native';
import {Form, Item, Container, Icon, View, Input, Label, Button, Text, Content, Left} from 'native-base'
import * as ImagePicker from 'expo-image-picker'


export default function EditScreen({navigation}){
    const [image, setImage] = useState([]);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
        setImage(image.concat(result.uri) );
        }
    };

    function destroyImg(i) {
       const newImg = image[i]
       let fixImg = image.filter((e) => {
           return e !== newImg
       })
       setImage(fixImg)
    }
    function toHome(){
        navigation.replace('Home')
    }

    return (
        <Container>
            <Content>
                <Form>
                    <Item>
                    <Input placeholder="Nama" />
                    </Item>
                    <Item >
                    <Input placeholder="Kategori Tukang" />
                    </Item>
                    <Item last>
                    <Input placeholder="Kota Domisili" />
                    </Item>
                
                <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
                    <Text>Portofolio:</Text>
                    <Button onPress={pickImage} iconLeft light>
                        <Icon name='cloud-upload' />
                        <Text>Upload</Text>
                    </Button>
                    {image.length > 0 &&
                        image.map((img, index) => {
                            return (
                                 <View key={index}>
                                     <Icon onPress={() => destroyImg(index)} name="close-circle-outline" style={{ zIndex:1 ,position: 'relative', top: 45, left: 1 }} /> 
                                     <Image source={{ uri: img }} style={{  width: 150, height: 100, marginTop: 20 }}/>
                                 </View>
    
                            )

                        })
                    }
                </View >
                <Text style={{alignSelf:'center', marginTop:10}}>Proyek</Text>
                <Item fixedLabel>
                    <Label> Kecil: </Label>
                    <Input />
                </Item>
                <Item style={{marginTop: 1}} rounded>
                    <Input placeholder='harga' />
                </Item>
                <Item fixedLabel>
                    <Label> Sedang:</Label>
                    <Input />
                </Item>
                <Item style={{marginTop: 1}} rounded>
                    <Input placeholder='harga' />
                </Item>
                <Item fixedLabel>
                    <Label> Besar:</Label>
                    <Input />
                </Item>
                <Item style={{marginTop: 1}} rounded>
                    <Input placeholder='harga' />
                </Item>
                </Form>
                <Button onPress={toHome} style={{marginTop: 30}} block info>
                    <Text>Simpan</Text>
                </Button>
            </Content>
      </Container>
    )
}