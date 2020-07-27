import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';


const CreateOrder=({route,navigation})=>{
    // const token=route.params.req;
    // console.log(token);
    const [order, setOrder]=useState({time:'', distance:'',
    price:'', zipcode:''
    })

    // const {partner, setPartner}=useState({gender:'', ageRange:''})

    async function bootstrapAsync() {
        // var token;
        try {
          const token = await AsyncStorage.getItem('userToken');
          console.log(token);
          return token;
        } catch (e) {
          // Restoring token failed
          console.log(e.message);
        }
        return;
    }

    const onSubmitForm=async e=>{
        e.preventDefault();
        try{
            const token=await bootstrapAsync();
            console.log(token);
            const time=order.time;
            const distance=order.distance;
            const price=order.price;
            const zipcode=order.zipcode;
            const body={time, distance, price, zipcode};
            console.log(body);
            const response= await fetch("http://localhost:5000/posts/",{
                method: "POST",
                headers: {"Content-Type": "application/json",
                    'Authorization': `Bearer `+token},
                body: JSON.stringify(body)
            });
            navigation.navigate('TabScreen',{screen: 'Orders'});
        }catch(err){
            console.error(err.message);
        }
    }


    return(
        <View>
            <Text>Create Order</Text>
            <Text>start time</Text>
            <TextInput 
            placeholder='start time'
            onChangeText={(val)=>{setOrder({
                ...order,
                time: val
            });
            }}/>
            <Text>Distance</Text>
            <TextInput
            placeholder='distance'
            onChangeText={(text)=>{
                setOrder({
                    ...order,
                    distance: text
                });
            }}
            />
            <Text>zipcode</Text>
            <TextInput
            placeholder='zipcode'
            onChangeText={
                (text)=>{
                    setOrder({
                        ...order,
                        zipcode: text
                        
                    });
                }
            }
            />
            {/* <Text>Patner Preferences</Text>
            <Text>partner gender</Text>
            <TextInput/>
            <Text>partner age range</Text>
            <TextInput/> */}
            <Text>price/30minutes</Text>
            <TextInput
            placeholder='price'
            onChangeText={
                (text)=>{
                    setOrder({
                        ...order,
                        price: text
                    });
                }
            }
            />

            <Button title="Submit" onPress={onSubmitForm}/>



        </View>

    )
}

export default CreateOrder;
