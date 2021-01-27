import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Image } from 'react-native';
import {Form, Item, Container, Icon, View, Input, Label, Button, Text, Content, Picker} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import FormData from 'form-data';
import axios from 'axios'
import {useSelector} from 'react-redux'


export default function EditScreen({navigation}){
    const token = useSelector(state => state.token)
    const idTukang = useSelector(state => state.idTukang)

    const [image, setImage] = useState([]);
    const [nama, setNama] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const[smallDesc, setSmallDesc] = useState('')
    const[smallPrice, setSmallPrice] = useState(0)
    const[mediumDesc, setMediumDesc] = useState('')
    const[mediumPrice, setMediumPrice] = useState(0)
    const[bigDesc, setBigDesc] = useState('')
    const[bigPrice, setBigPrice] = useState(0)
    const [avatar, setAva] = useState('')
    const [isUpload, setIsUpload] = useState(false)
    const [isAvaUpload, setIsAvaUpload] = useState(false)

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
        // console.log(result);
        if (!result.cancelled) {
            // setImage(result.uri)
            setIsUpload(false)
            setImage(image.concat(result.uri) )
            // setUri(result.uri)
            ;
        } 
    };

    function destroyImg(i) {
       const newImg = image[i]
       let fixImg = image.filter((e) => {
           return e !== newImg
       })
       setImage(fixImg)
    // setImage('')
    }
    function destroyAva() {
        setAva('')
     }

    function inputNama (value){
        setNama(value)
    }
    function inputLocation (value){
        setLocation(value)
    }
    function inputCategory(value){
        setCategory(value)
    }
    function inputSmallDesc(value) {
        setSmallDesc(value)
    }
    function inputSmallPrice(value) {
        setSmallPrice(value)
    }
    function inputMediumDesc(value) {
        setMediumDesc(value)
    }
    function inputMediumPrice(value) {
        setMediumPrice(value)
    }
    function inputBigDesc(value) {
        setBigDesc(value)
    }
    function inputBigPrice(value) {
        setBigPrice(value)
    }

    function editData(){
        let payload = {
            name: nama,
            location: location,
            category: category,
            small_project_desc: smallDesc,
            small_project_price: +smallPrice,
            medium_project_desc: mediumDesc,
            medium_project_price: +mediumPrice,
            big_project_desc: bigDesc,
            big_project_price: +bigPrice,
        }

        axios({
            method: 'PUT',
            url: 'http://192.168.1.7:3000/tukang/' + idTukang,
            headers: {access_token: token},
            data: payload
        })
        .then(_ =>{
            navigation.replace('Home')
        })
        .catch(err => console.log(err))
        
       
        // navigation.replace('Home')
    }

    function uploadPorto(){
        let formData = new FormData()
        for(let i = 0; i < image.length; i++){
            let fileType= image[i].substring(image[i].lastIndexOf('.') + 1)
            formData.append("url", {
                uri: image[i],
                name: `photo.${fileType}`,
                type: `image/${fileType}`
              })
        }
        axios({
            method: 'PUT',
            url: `http://192.168.1.7:3000/tukang/${idTukang}/upload`,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
        .then(result => {
            setImage([])
            setIsUpload(true)
            
        })
        .catch(err => console.log('dwd', err))
    }

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setIsAvaUpload(false)
            setAva(result.uri)
            
        } 
    }

    function uploadAvatar() {
        let formData = new FormData()
            let fileType= avatar.substring(avatar.lastIndexOf('.') + 1)
            formData.append("avatar", {
                uri: avatar,
                name: `photo.${fileType}`,
                type: `image/${fileType}`
              })
        
        axios({
            method: 'PUT',
            url: `http://192.168.1.7:3000/tukang/${idTukang}/avatar`,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
        .then(result => {
            setAva('')
            setIsAvaUpload(true)
        })
        .catch(err => console.log('dwd', err))
    }
    

    return (
        <Container>
            <Content>
                     <Text>Foto Profil:</Text>
                    
                    <Button onPress={pickAvatar}
                        iconLeft light>
                        <Icon name='cloud-upload' />
                        <Text>Upload</Text>
                    </Button>
                     {avatar.length > 0 &&
                                 <View >
                                     <Icon onPress={destroyAva} name="close-circle-outline" style={{ zIndex:1 ,position: 'relative', top: 45, left: 1 }} /> 
                                     <Image source={{ uri: avatar }} style={{  width: 150, height: 100, marginTop: 20 }}/>
                                 </View>
                    }
                    {
                        isAvaUpload && <Text style={{color: 'green'}}>Upload success</Text>
                    }
                    <Button onPress={uploadAvatar} >
                        <Text>Simpan</Text>    
                    </Button>
                    <Content style={{marginTop: 20, marginLeft: 10, paddingBottom:10}}>
                <Text>Portofolio:</Text>
                    
                    <Button onPress={pickImage}
                        iconLeft light>
                        <Icon name='cloud-upload' />
                        <Text>Upload</Text>
                    </Button>
                    {/* {image.length > 0 &&
                                 <View >
                                     <Icon onPress={destroyImg} name="close-circle-outline" style={{ zIndex:1 ,position: 'relative', top: 45, left: 1 }} /> 
                                     <Image source={{ uri: image }} style={{  width: 150, height: 100, marginTop: 20 }}/>
                                 </View>
                    } */}
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
                    {
                        isUpload && <Text style={{color: 'green'}}>Upload success</Text>
                    }
                    <Button onPress={uploadPorto} >
                        <Text>Simpan</Text>    
                    </Button>

                </Content>
                <Form>
                    <Item>
                    <Input placeholder="Nama" onChangeText={inputNama} />
                    </Item>
                    <Item picker>
                    <Picker

                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: 300 }}
                        selectedValue={category}
                        onValueChange={inputCategory}
                    >
                        <Picker.Item  label="Pilih Kategori" />
                        <Picker.Item label="Tukang Bangunan" value="bangunan" />
                        <Picker.Item label="Tukang Listrik" value="listrik" />
                        <Picker.Item label="Tukang Kebun" value="kebun" />
                    </Picker>
                    </Item>
                    <Item last>
                    <Input onChangeText={inputLocation} placeholder="Kota Domisili" />
                    </Item>
                
                <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
                    
                    
                </View >
                <Text style={{alignSelf:'center', marginTop:10}}>Proyek</Text>
                <Item fixedLabel>
                    <Label> Kecil: </Label>
                    <Input onChangeText={inputSmallDesc} />
                </Item>
                <Item style={{marginTop: 1}} rounded>
                    <Input onChangeText={inputSmallPrice} placeholder='harga' />
                </Item>
                <Item fixedLabel>
                    <Label> Sedang:</Label>
                    <Input onChangeText={inputMediumDesc} />
                </Item>
                <Item style={{marginTop: 1}} rounded>
                    <Input onChangeText={inputMediumPrice} placeholder='harga' />
                </Item>
                <Item fixedLabel>
                    <Label> Besar:</Label>
                    <Input onChangeText={inputBigDesc} />
                </Item>
                <Item style={{marginTop: 1}} rounded>
                    <Input onChangeText={inputBigPrice} placeholder='harga' />
                </Item>
                </Form>
                <Button onPress={editData} style={{marginTop: 30}} rounded info>
                    <Text>Simpan</Text>
                </Button>
                
            </Content>
      </Container>
    )
}