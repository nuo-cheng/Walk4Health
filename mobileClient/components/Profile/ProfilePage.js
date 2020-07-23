import React, {useState, useEffect} from "react";
import Star from 'react-native-star-view';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    ScrollView, 
    AsyncStorage,
    TouchableOpacity
 } from "react-native";
import { Ionicons, AntDesign,MaterialIcons } from "@expo/vector-icons";
import ProfilePhoto from '../../pic/Profile_photo2.jpg';
// npm install --save-dev @iconify/react @iconify/icons-ant-design
import { Icon, InlineIcon } from '@iconify/react';
import editOutlined from '@iconify/icons-ant-design/edit-outlined';



const ProfilePage = ({ route, navigation}) => {
    
    const [user, setUser]= useState([]);
    const [rating, setRating] = useState([]);
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

    const getUser=async()=>{
        try{
            const token=await bootstrapAsync();
            const response= await fetch("http://localhost:5000/users/myprofile", {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},

            });

            
            const jsonData= await response.json();
            setUser(jsonData[0]);
           
        }catch(err){
            console.error(err.message);
        }
        };

        const getRating=async()=>{
            try{
                const token=await bootstrapAsync();
             //   console.log('async token',token);
        
                const response= await fetch("http://localhost:5000/posts/ratings", {
                    method: "GET",
                    headers: {"Content-Type": "application/json",
                    'Authorization': `Bearer ` + token},
    
                });
                console.log("hereherehere finish response")
                
                const jsonData= await response.json();
               console.log('testtesttest json', jsonData);
                setRating(jsonData);
                
            }catch(err){
                console.error(err.message);
            }
            };

        useEffect(()=> {
           // console.log("profile page: getRating");
            getUser();
            getRating();
        }, []);
        console.log('get rating result',rating);

        return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={ProfilePhoto} style={styles.image}resizeMode="center"></Image>
                </View>

                <View style={styles.add}>
                    <Ionicons name="ios-add" size={40} color="#DFD8C8" style={{ marginLeft: 2 }}></Ionicons>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> {user.name} </Text>
               
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Star score={rating[0]} style={styles.starStyle} />
                    <Text style={[styles.subText, {fontSize: 15}]}>({rating[1]})</Text>
                    </View>
        <Text style={[styles.text, { fontSize: 24 }]}>{rating[0]}</Text>
                    <Text style={[styles.subText]}>Overall Rating</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', width: 250}}>
                <Text style={[styles.subText, styles.recent]} >Personal Info </Text>
                <TouchableOpacity>
                    <AntDesign name="edit" size={18} style={{marginTop: 32,marginBottom: 6}} color="#009387"  />
                    {/* onPress={() => {loginHandle( data.email, data.password )}} */}
                </TouchableOpacity>
            </View>    
            
            <View style={{ alignItems: "center" }}>
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
                    <View style={{ flexDirection: 'row'}}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250, flexDirection: 'row' }}>
                    <Text style={[styles.text_footer]}>
                            email: {user.email}   
                     </Text>
                     <TouchableOpacity>
                        <Text style={[styles.text_footer, { textDecorationLine: 'underline', marginLeft: 5, color:'gray'}]}>Change</Text>
                        {/* onPress={() => {loginHandle( data.email, data.password )}} */}
                     </TouchableOpacity>
                    </View>

                    
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                    <TouchableOpacity>
                        <Text style={[styles.text_footer, { textDecorationLine: 'underline', color:'gray'}]}>Change Password</Text>
                        {/* onPress={() => {loginHandle( data.email, data.password )}} */}
                     </TouchableOpacity>
                        
                    </View>
                </View>
            </View>


        </ScrollView>
    );
}




const styles = StyleSheet.create({
    activityIndicator: {
        backgroundColor: "#009387",
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
        flex:1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 22
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
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
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
    }

});

export default ProfilePage;