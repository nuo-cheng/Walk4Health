import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProfilePage from "../components/Profile/ProfilePage";
import { AuthContext } from '../App';


export default function Profile({ route, navigation }) {
    const { signOut } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <ProfilePage route={route} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },


});