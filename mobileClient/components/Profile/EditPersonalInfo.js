
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

var radio_props = [
    { label: 'female', value: 0 },
    { label: 'male', value: 1 },
    { label: 'other', value: 2 }
];

var arr = [radio_props[0].label, radio_props[1].label, radio_props[2].label]

const EditPersonalInfo = ({ user, setUser, personalInfo, setPersonalInfo, signal, setSignal}) => {
        // const token = route.params.req;
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
    const getUser = async () => {
        try {
            const token = await bootstrapAsync();
            const response = await fetch("http://localhost:5000/users/myprofile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ` + token
                },

            });


            const jsonData = await response.json();
            console.log('001test user', jsonData);
            setUser(jsonData[0]);
            console.log('test RIGHT AFTER SET USER', user);


        } catch (err) {
            console.error(err.message);
        }
    };


    const nameInputChange = (val) => {
        if (val.length !== 0) {
            setPersonalInfo({
                ...personalInfo,
                name: val,
                check_textInputChange: true
            });

        } else {
            setPersonalInfo({
                ...personalInfo,
                name: val,
                check_textInputChange: false
            });
        }
    }

    const handleGenderChange = (val) => {
        setPersonalInfo({
            ...personalInfo,
            gender: arr[val]
        });
        console.log('test arr value', arr[val]);
    }



    const handleAgeChange = (val) => {
        setPersonalInfo({
            ...personalInfo,
            age: Number(val)
        });
    }


    const updatePersonalInfo = async () => {
        try {
            console.log('INTO UPDATEPERSONALINFO?');
            console.log('test personal info', personalInfo);
            const token = await bootstrapAsync();
            const update = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ` + token
                },
                body: JSON.stringify(personalInfo)

            });

            const jsonData = await update.json();
            // console.log('test personal info update', jsonData);
            // setUser(jsonData[0]);
            getUser();
        } catch (err) {
            console.error(err.message);
        }
    };
    console.log('=====================', user)

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Edit Personal Info</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder={user.name}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => nameInputChange(val)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Age</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            keyboardType={'numeric'}
                            placeholder={String(user.age)}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleAgeChange(val)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Gender</Text>
                    <View style={styles.action}>

                        {/* <TextInput
                            placeholder={user.gender}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleGenderChange(val)}
                        /> */}
                        <RadioForm
                            radio_props={radio_props}
                            initial={arr.indexOf(user.gender)}
                            onPress={(val) => handleGenderChange(val)}
                            buttonColor={'#009387'}
                            buttonInnerColor={'#009387'}
                            animation={true}
                        />
                    </View>


                    <View style={styles.button}>
                        <TouchableOpacity  style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]} onPress={() => {
                            setSignal(false);
                            updatePersonalInfo();
                        }}>
                            
                                <Text style={styles.text_footer}>Update</Text>
                            
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
};

export default EditPersonalInfo;

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