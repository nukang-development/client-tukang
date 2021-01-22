import React, {useState} from 'react';
import {  View, Dimensions, ScrollView, Image, Text } from 'react-native';

const {width} = Dimensions.get("window")
const height = width * 0.6

export default function Porto () {

    const [listPorto, setPorto] = useState([
        'https://cdn.pixabay.com/photo/2014/10/07/13/48/mountain-477832_960_720.jpg',
        'https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg',
        'https://cdn.pixabay.com/photo/2013/11/15/13/57/road-210913_960_720.jpg'
    ])

    return (
        <View>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                {
                    listPorto.map((porto, index) => (
                        <Image
                            key={index}
                            source={{uri: porto}}
                            style={{width, height, resizeMode: 'contain'}}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}