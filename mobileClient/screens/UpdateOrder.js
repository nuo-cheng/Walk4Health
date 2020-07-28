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
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const UpdateOrderInfo = ({ order, setOrder, orderInfo, setOrderInfo, signal, setSignal}) => {

    async function bootstrapAsync() {
        let token;
        try {
          token = await AsyncStorage.getItem('userToken');

          return token;
        } catch (e) {
          // Restoring token failed
          console.log(e.message);
        }
        return;
    }

    const getOrder = async()=>{
        try {
            const token=await bootstrapAsync();
            const id = order.id;
            console.log("order id update: "+ id);
            const response= await fetch(`http://localhost:5000/posts/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                })
            const jsonData= await response.json();
            setOrder(jsonData);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    const updateOrder = async () => {
        try {
            const id = order.id;
            const token = await bootstrapAsync();
            const update = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ` + token
                },
                body: JSON.stringify(orderInfo)

            });

            const jsonData = await update.json();
            // console.log('test personal info update', jsonData);
            // setUser(jsonData[0]);
            getOrder();
        } catch (err) {
            console.error(err.message);
        }
    };

    const timeInputChange = (val) => {
        if (val.length !== 0) {
            setOrderInfo({
                ...orderInfo,
                time: val,
                check_textInputChange: true
            });

        } else {
            setOrderInfo({
                ...orderInfo,
                time: val,
                check_textInputChange: false
            });
        }
    }

    const zipcodeInputChange = (val) => {
        if (val.length !== 0) {
            setOrderInfo({
                ...orderInfo,
                zipcode: val,
                check_textInputChange: true
            });

        } else {
            setOrderInfo({
                ...orderInfo,
                zipcode: val,
                check_textInputChange: false
            });
        }
    }

    const priceInputChange = (val) => {
        setOrderInfo({
                    ...orderInfo,
                    price: Number(val)
                });
    }

    const distanceInputChange = (val) => {
        setOrderInfo({
            ...orderInfo,
            distance: Number(val)
        });
    }


    // const handleAgeChange = (val) => {
    //     setPersonalInfo({
    //         ...personalInfo,
    //         age: Number(val)
    //     });
    // }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Edit Order Info</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Time</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder={order.time}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => timeInputChange(val)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Zipcode</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            keyboardType={'numeric'}
                            placeholder={String(order.zipcode)}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => zipcodeInputChange(val)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Price</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            keyboardType={'numeric'}
                            placeholder={String(order.price)}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => priceInputChange(val)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Distance</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            keyboardType={'numeric'}
                            placeholder={String(order.distance)}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => distanceInputChange(val)}
                        />
                    </View>
                    


                    <View style={styles.button}>
                        <TouchableOpacity  style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]} onPress={() => {
                            setSignal(false);
                            updateOrder();
                        }}>
                            
                                <Text style={styles.text_footer}>Update</Text>
                            
                        </TouchableOpacity>
                    
                    <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => setSignal(false)}
                >
                    <Text style={[styles.textSign, {
                        color:'#009387'
                    }]}>return</Text>
                </TouchableOpacity>

                        {/* <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#009387'
                  }]}>Sign In</Text>
              </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );

            }

export default UpdateOrderInfo;



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
        color: '#05375a',
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
        marginTop: 50
    },
    signIn: {
        width: '100%',
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