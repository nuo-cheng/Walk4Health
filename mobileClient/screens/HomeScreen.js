import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Col, Row, Grid } from "react-native-easy-grid";
import walking from '../pic/walking.png';
const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      

      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.header}>
      <Text style={styles.title}>Walk4Health</Text>
     </View>
      
     {/* <Grid>
                <Col> */}
                    

                {/* </Col>
                <Col> */}
                 <View style={styles.button}>
     <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#009387',
                        backgroundColor: '#009387',
                        borderWidth: 1,
                        marginTop: 120
                    }]}
                    onPress={() => navigation.navigate("SignUp")}>
            <Text style={[styles.textSign, {
                        color:'#ffffff',

                    }]}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      <View style={styles.button}>
      <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#a751e8',
                        backgroundColor: "#a751e8",
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => navigation.navigate("SignIn")}>
            <Text style={[styles.textSign, {
                        color:'#ffffff'
                    }]}>Log in</Text>
       </TouchableOpacity>
       </View>
       <View style={{ alignSelf: "flex-end"}}>
                <View style={styles.profileImage}>
                    <Image source={walking} style={styles.image} resizeMode="center"></Image>
                </View>

            </View>
          
      
      
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 100
  },
  title: {
    textAlign: 'center',
    color: '#a751e8',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 6,
},
button: {
  alignItems: 'center',
  marginTop: 30
},
signIn: {
  width: '30%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
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
  width: 350,
  height: 450,
  borderRadius: 400 /2,
  overflow: "hidden",
  marginTop: 20,

}

});