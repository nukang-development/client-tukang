import React, {useEffect, useState} from 'react';
import {  View, Dimensions, ScrollView, Image, Text } from 'react-native';

const {width} = Dimensions.get("window")
const height = width * 0.6

export default function Porto (props) {

    const [listPorto, setPorto] = useState([
        'https://i.imgur.com/K1Vpnuo.png'
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
        <View style={{borderRadius: 20}}>
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
            </ScrollView>
        </View>
    )
}