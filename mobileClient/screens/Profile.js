import React from "react";
import { StyleSheet, 
    Text, 
    View, 

    Image, 
    ScrollView, 
    AsyncStorage} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProfilePage from "../components/Profile/ProfilePage";
export default function Profile({route,navigation}){
    return(
        <View style={styles.container}>
           <ProfilePage route={route} navigation={navigation}/>
            </View>
    );
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});