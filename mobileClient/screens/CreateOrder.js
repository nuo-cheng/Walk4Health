import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

const CreateOrder=({route,navigation})=>{
    const token=route.params.req;
    console.log(token);
    const {order, setOrder}=useState({time:'', distance:'',
    price:''
    })

    const {partner, setPartner}=useState({gender:'', ageRange:''})

    return(
        <View>
            <Text>Create Order</Text>
            <Text>start time</Text>
            <TextInput/>
            <Text>Distance</Text>
            <TextInput/>
            <Text>Patner Preferences</Text>
            <Text>partner gender</Text>
            <TextInput/>
            <Text>partner age range</Text>
            <TextInput/>
            <Text>price/30minutes</Text>
            <TextInput/>

            <Button title="Submit"/>



        </View>

    )
}

export default CreateOrder;
