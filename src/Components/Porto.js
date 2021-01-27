import React, {useEffect, useState} from 'react';
import {  View, Dimensions, ScrollView, Image, Text } from 'react-native';

const {width} = Dimensions.get("window")
const height = width * 0.6

export default function Porto (props) {

    const [listPorto, setPorto] = useState([
        'https://i.imgur.com/4f4kvB2.png',
        'https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg',
        'https://cdn.pixabay.com/photo/2013/11/15/13/57/road-210913_960_720.jpg'
    ])

    useEffect(() => {
        let portoArr = []
        if(props.data.length > 0) {
            props.data.map((e) => {
                return portoArr.push(e.link)
            })
            setPorto(portoArr)
        }
    }, [props])

    return (
        <View>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                {
                    !listPorto[0] ? <Text>Loading...</Text> : 
                    listPorto.map((porto, index) => (
                        <Image
                            key={index}
                            source={{uri: porto}}
                            style={{width, height, resizeMode: 'contain'}}
                        />
                    ))
                }
                {/* {
                    listPorto.map((porto, index) => (
                        <Image
                            key={index}
                            source={{uri: porto}}
                            style={{width, height, resizeMode: 'contain'}}
                        />
                    ))
                } */}
            </ScrollView>
        </View>
    )
}