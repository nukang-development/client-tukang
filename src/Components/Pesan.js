import React from 'react';
import { StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import {Card, CardItem, Container, Body, Badge, Icon, Input, Item, Label, Button, Text, View, Content} from 'native-base'

export default function Pesan({navigation}) {

    function toChat() {
        navigation.push('Chat')
    }
    return (
        <ScrollView>
          <Container>
            <TouchableHighlight onPress={toChat}>
                <Card>
                    <View style={{padding: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon name='close' />
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                Mozart Mongi
                            </Text>
                            <Badge success>
                                <Text>2</Text>
                            </Badge>
                        </View>      
                    </View>
                </Card>
            </TouchableHighlight>
        </Container>
      </ScrollView>
    );
  }