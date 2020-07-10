import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      

      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.header}>
      <Text style={styles.title}>Walk4Health</Text>
     </View>
     <View style={styles.button}>
     <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => navigation.navigate("SignUp")}>
            <Text style={[styles.textSign, {
                        color:'#009387'
                    }]}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      <View style={styles.button}>
      <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => navigation.navigate("SignIn")}>
            <Text style={[styles.textSign, {
                        color:'#009387'
                    }]}>Log in</Text>
       </TouchableOpacity>
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
    color: '#009387',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
},
button: {
  alignItems: 'center',
  marginTop: 50
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
}

});