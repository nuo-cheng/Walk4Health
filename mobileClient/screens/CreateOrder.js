
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CreateOrder=({route,navigation})=>{

    const [order, setOrder]=useState({time:'', distance:'',
    price:'', zipcode:''
    })

    

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
        <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />
        <View style={styles.header}>
            <Text style={styles.text_header}>Create Order</Text>
        </View>
        <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
                <Text style={styles.text_footer}>start time</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#ed6a0c"
                        size={20}
                    />
                    <TextInput
                        placeholder='start time'
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>{setOrder({
                            ...order,
                            time: val
                        });
                        }}
                    />
                </View>

                <Text style={styles.text_footer}>Distance</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="info"
                        color="#ed6a0c"
                        size={20}
                    />
                    <TextInput
                        placeholder='walking distance'
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>{setOrder({
                            ...order,
                            distance: val
                        });
                        }}
                    />
                </View>

                <Text style={styles.text_footer}>Zipcode</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="map-marker"
                        color="#ed6a0c"
                        size={20}
                    />
                    <TextInput
                        placeholder='where you want to have this walk'
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>{setOrder({
                            ...order,
                            zipcode: val
                        });
                        }}
                    />
                </View>

                <Text style={styles.text_footer}>Price</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="usd"
                        color="#ed6a0c"
                        size={20}
                    />
                    <TextInput
                        placeholder='price/30 minutes'
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>{setOrder({
                            ...order,
                            price: val
                        });
                        }}
                    />
                </View>

              


                <View style={styles.button}>
                    <TouchableOpacity  style={[styles.signIn, {
                    borderColor: '#ed6a0c',
                    
                    borderWidth: 1,
                    marginTop: 15
                }]} onPress={onSubmitForm}>
                        
                            <Text style={styles.text_footer}>Submit</Text>
                        
                    </TouchableOpacity>

     
                </View>
            </ScrollView>
        </Animatable.View>
    </View>
);
}

export default CreateOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#009387',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
       
    },
    signIn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 22
    }
});
