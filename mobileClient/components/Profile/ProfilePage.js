import * as Animatable from 'react-native-animatable';
import ChangePassword from './ChangePassword';
import EditEmail from './EditEmail';
import EditPersonalInfo from './EditPersonalInfo';
import Feather from 'react-native-vector-icons/Feather';
import female from '../../pic/female.png';
import male from '../../pic/male.png';
import generic from '../../pic/generic.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from "react";
import Star from 'react-native-star-view';
import { AuthContext } from '../../App';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    Modal,
    TextInput
} from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";



const ProfilePage = ({ route, navigation }) => {

    const [user, setUser] = useState({});
    const [rating, setRating] = useState([]);
    const [signal, setSignal] = useState(false);
    const [signal1, setSignal1] = useState(false);
    const [signal2, setSignal2] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        check_textInputChange: false
    });
    const {signOut}= React.useContext(AuthContext);

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

  


    const getRating = async () => {
        try {
            const token = await bootstrapAsync();
            //   console.log('async token',token);

            const response = await fetch("http://localhost:5000/posts/ratings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ` + token
                },

            });

            const jsonData = await response.json();
            //console.log('testtesttest json', jsonData);
            setRating(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    };

    const getProfileImage = (val) => {
        console.log('test profile image import', val);
        if (val === 'female') {
            return female;

        } else if(val === 'male') {
            return male;
        } else {
            return generic;
        }
    }

    useEffect(() => {
        getUser();
        getRating();
        
    }, []);
    console.log('user testtesttest', user);
    console.log('personal info test', personalInfo);

    return (

        <ScrollView showsVerticalScrollIndicator={false}>
                    <Grid>
                <Col>
                     <View style={{ alignSelf: "center"}}>
                <View style={styles.profileImage}>
                    <Image source={getProfileImage(user.gender)} style={styles.image} resizeMode="center"></Image>
                </View>

            </View>

                </Col>
                <Col>
            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36, color:"#009387" }]}> {user.name} </Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Star score={rating[0]} style={styles.starStyle} />
                        <Text style={[styles.subText, { fontSize: 15, color:"#009387" }]}>{rating[0]}</Text>
                        <Text style={[styles.subText, { fontSize: 15 }]}>({rating[1]})</Text>
                    </View>
                    
                    <Text style={[styles.subText]}>Overall Rating</Text>
                </View>
            </View>
                </Col>
            </Grid>


            <View style={{ flexDirection: 'row', width: 250 }}>
                <Text style={[styles.subText, styles.recent]} >Personal Info </Text>
                <TouchableOpacity onPress={() => setSignal(true)}>
                    <AntDesign name="edit" size={18} style={{ marginTop: 32, marginBottom: 6 }} color="#009387" />

                </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text_footer]}>
                            User Name: {user.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text_footer]}>
                            Age: {user.age}
                        </Text>
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text_footer]}>
                            Gender: {user.gender}
                        </Text>
                    </View>
                </View>
            </View>

            <Text style={[styles.subText, styles.recent]}>Log in Info</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250, flexDirection: 'row' }}>
                            <Text style={[styles.text_footer]}>
                                email: {user.email}
                            </Text>
                            <TouchableOpacity onPress={() => setSignal1(true)}>
                                <Text style={[styles.text_footer, { textDecorationLine: 'underline', marginLeft: 5, color: 'gray' }]}>Change</Text>
                                
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <TouchableOpacity onPress={() => setSignal2(true)}>
                            <Text style={[styles.text_footer, { textDecorationLine: 'underline', color: 'gray' }]}>Change Password</Text>
                            
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
            <View >
                <Modal visible={signal} style={styles.infoContainer}>
                    {/* console.log("test===========before into child component", user); */}
                    <EditPersonalInfo  user={user} setUser = {setUser}  personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} signal = {signal} setSignal = {setSignal} />

                </Modal>
            </View>
            <View >
                <Modal visible={signal1} style={styles.infoContainer}>
                    {/* console.log("test===========before into child component", user); */}
                    <EditEmail  user={user} setUser = {setUser}  signal = {signal1} setSignal = {setSignal1} />

                </Modal>
            </View>
            <View >
                <Modal visible={signal2} style={styles.infoContainer}>
                    {/* console.log("test===========before into child component", user); */}
                    <ChangePassword  user={user} setUser = {setUser}  signal = {signal2} setSignal = {setSignal2} />

                </Modal>
            </View>
            <View style={styles.button}>
      <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#a751e8',
                        backgroundColor: "#a751e8",
                        borderWidth: 1,
                        marginTop: 5
                    }]}
                    onPress={() => signOut()}>
            <Text style={[styles.textSign, {
                        color:'#ffffff'
                    }]}>Log Out</Text>
       </TouchableOpacity>
       </View>
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    activityIndicator: {
        backgroundColor: "#ed721a",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    add: {
        backgroundColor: "#009387",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    edit: {
        backgroundColor: "#AEB5BC",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 22,
        paddingTop: 30,

    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden",
        marginTop: 20,
    },
    recent: {
        marginLeft: 50,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8
    },
    starStyle: {
        width: 100,
        height: 20,
        marginBottom: 10
    
        
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 12
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },

    subText: {
        fontSize: 10,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },


    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15
    },
    button: {
        alignItems: 'center',
        marginTop: 75
      },
      signIn: {
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
      },

});

export default ProfilePage;