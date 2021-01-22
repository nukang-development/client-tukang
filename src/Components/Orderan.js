import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {Card, CardItem, Container, Body, Form, Input, Item, Label, Button, Text, View, Content} from 'native-base'



export default function Orderan() {
    return (
        <ScrollView>
            <Container>
            <Card>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                            Mozart Mongi
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                            25-01-2021
                        </Text>
                    </View>
                    <Text style={{marginTop: 10}}>
                        Jl. Maju Terus pantang munduer no.5, kec. wedew, Kota Hacktiv8
                    </Text>
                    <Text style={{marginTop: 15}}>
                        No. Handphone:
                    </Text>
                    <Text style={{fontWeight:'bold'}}>
                        0888888888
                    </Text>
                    <Text style={{marginTop: 10}}>
                        Small Project: 2 meter
                    </Text>
                    <Text>
                        Total: Rp.100.000
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                        <Button style={{marginRight: 15, paddingHorizontal: 30}} rounded success>
                            <Text>Take</Text>
                        </Button>
                        <Button style={{paddingHorizontal: 30}} rounded light>
                            <Text >Drop</Text>
                        </Button>
                    </View>             
                </View>
            </Card>
        </Container>
      </ScrollView>
    );
  }