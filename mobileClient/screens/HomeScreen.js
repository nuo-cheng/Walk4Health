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
      
     <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.item}>Sign Up</Text>
        </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.item}>Log in</Text>
       </TouchableOpacity>
      
      
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    color: 'coral',
    fontSize: 20,
    fontWeight: 'bold',
},
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: 'coral',
    backgroundColor: 'coral',
    color: '#fff',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    fontWeight: 'bold',
}

});