import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Image , ScrollView} from 'react-native';
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
          url: 'http://54.255.251.4/tukang/' + idTukang,
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
          url: `http://54.255.251.4/tukang/${idTukang}/upload`,
          headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              access_token: token
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
          url: `http://54.255.251.4/tukang/${idTukang}/avatar`,
          headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              access_token: token
          },
          data: formData
      })
      .then(result => {
          setAva('')
          setIsAvaUpload(true)
      })
      .catch(err => console.log('eror upload profile>>>', err))
  }
    

  return (
    
    <ScrollView style={styles.container}>
      <View style={{backgroundColor: "#f9e0ae", padding: 10, width: '100%', borderRadius: 30}}>
        <Text style={styles.textProfil}>Foto Profil :</Text>
        <View style={styles.profile}>
        <Button onPress={pickAvatar} iconLeft small rounded primary style={styles.btnUpload}>
          <Icon name='cloud-upload' />
          <Text>Upload</Text>
        </Button>
          
          <Button onPress={uploadAvatar} iconLeft small rounded success style={styles.btnUpload}>
            <Icon name='save-outline'/>
            <Text>Simpan</Text>    
          </Button>
        </View>
        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
        {avatar.length > 0 &&
            <View >
                <Icon onPress={destroyAva} name="close-circle-outline" style={{ zIndex:1 ,position: 'relative', top: 45, left: 1 }} /> 
                <Image source={{ uri: avatar }} style={{  width: 150, height: 100, marginTop: 20 }}/>
            </View>
          }
          {
            isAvaUpload && <Text style={{color: 'green'}}>Upload success</Text>
          }
        </View>
        
          
          <Content style={{marginTop: 20}}>
            <Text style={styles.textProfil}>Portofolio :</Text>
            <View style={styles.profile}>
            <Button onPress={pickImage} iconLeft small rounded primary style={styles.btnUpload}>
              <Icon name='cloud-upload' />
              <Text>Upload</Text>
            </Button>
              
              <Button onPress={uploadPorto} iconLeft small rounded success style={styles.btnUpload}>
                <Icon name='save-outline'/>  
                <Text>Simpan</Text>
              </Button>
            </View>
            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
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
            </View>
          </Content>

            <Form style={{marginTop: 30, backgroundColor:"#fc8621", borderRadius: 30}}>
              <Item last>
                <Input placeholder="Nama" onChangeText={inputNama} style={{color:"#dfe6e9"}}/>
              </Item>
              <Item last>
                <Icon name={'location-outline'} size={10} style={{color:"#273c75"}}/>
                <Input onChangeText={inputLocation} placeholder="Kota Domisili" style={{color:"#dfe6e9"}}/>
              </Item>
              <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 300 }}
                selectedValue={category}
                onValueChange={inputCategory}
              >
                <Picker.Item label="Pilih Kategori" />
                <Picker.Item label="Tukang Bangunan" value="bangunan" />
                <Picker.Item label="Tukang Listrik" value="listrik" />
                <Picker.Item label="Tukang Kebun" value="kebun" />
              </Picker>
              </Item>
            
            <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={{alignSelf:'center', fontSize: 25, fontWeight:"bold"}}>Proyek :</Text>
            <Item inlineLabel style={{marginTop:10}}>
              <Icon name={'hammer-outline'} size={10} style={{color:"#273c75"}}/>
              <Label>Proyek Kecil</Label>
              <Input onChangeText={inputSmallDesc} />
            </Item>
            <Item rounded style={{marginTop: 10}} rounded>
                <Input onChangeText={inputSmallPrice} placeholder='Input harga' style={{color: "#dfe6e9"}}/>
            </Item>
            <Item inlineLabel style={{marginTop:15}}>
              <Icon name={'hammer-outline'} size={10} style={{color:"#273c75"}}/>
              <Label>Proyek Sedang</Label>
              <Input onChangeText={inputMediumDesc} />
            </Item>
            <Item style={{marginTop: 10}} rounded>
                <Input onChangeText={inputMediumPrice} placeholder='Input harga' />
            </Item>
            <Item inlineLabel style={{marginTop:15}}>
            <Icon name={'hammer-outline'} size={10} style={{color:"#273c75"}}/>
            <Label>Proyek Besar</Label>
                <Input onChangeText={inputBigDesc} />
            </Item>
            <Item style={{marginTop: 10, marginBottom: 10}} rounded>
                <Input onChangeText={inputBigPrice} placeholder='Input harga' />
            </Item>
            </View >
          </Form>
          <View style={styles.profile}>
          <Button onPress={editData} 
            style={styles.btnSave} iconLeft small rounded success>
            <Icon name='save-outline'/>
              <Text>Simpan</Text>
            </Button>
          </View>
            
          </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginBottom: 100,
    // justifyContent: 'center',
    padding: 20
  },
  textProfil: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 20,
    textAlign: 'center'
  },
  profile: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnUpload: {
    marginLeft: 10,
    justifyContent: "center",
    width: 120,
    height: 40,
    alignItems: 'center',
  },
  btnSave: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "center",
    width: 150,
    height: 40,
    alignItems: 'center',
  }
})