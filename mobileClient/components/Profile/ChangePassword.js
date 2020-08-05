
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

import Feather from 'react-native-vector-icons/Feather';


const ChangePassword = ({ user, setUser,signal, setSignal}) => {
    const [password, setPassword] = useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidPassword: true,
        confirm_secureTextEntry: true});
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




    const handlePasswordChange = (val) => {
        if (val.length !== 0 && val.length >= 8 ) {
            setPassword({
                password: val,
                check_textInputChange: true,
                isValidPassword: true
            });

        } else {
            setPassword({
                password: val,
                check_textInputChange: false,
                isValidPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        setPassword({
            ...password,
            confirm_password: val
        });
    }

    const updatePassword = async () => {
        try {
            console.log('INTO update email?');
            console.log('test password info', password);
            const token = await bootstrapAsync();
            const update = await fetch(`http://localhost:5000/users/changepassword/${user.id}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ` + token
                },
                body: JSON.stringify(password)

            });

            await update.json();
  
            getUser();
        } catch (err) {
            console.error(err.message);
        }
    };
    console.log('=====================after update password', user)

    const updateSecureTextEntry = () => {
        setPassword({
            ...password,
            secureTextEntry: !password.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setPassword({
            ...password,
            confirm_secureTextEntry: !password.confirm_secureTextEntry
        });
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Change Password</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                <Text style={[styles.text_footer, {
                // color: colors.text,
                marginTop: 35
            }]}>New Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    // color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder={"Reset Your Password"}
                    placeholderTextColor="#666666"
                    secureTextEntry={password.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        // color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {password.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { password.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={password.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {password.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
                    <View style={styles.button}>
                        <TouchableOpacity  style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]} onPress={() => {
                            setSignal(false);
                            updatePassword();
                        }}>
                            
                                <Text style={styles.text_footer}>Update Password</Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity  style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]} onPress={() => {setSignal(false);}}>
                            
                        <Text style={styles.text_footer}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default ChangePassword;

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