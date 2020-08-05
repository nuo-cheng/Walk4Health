import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import React from 'react';



import SignUp from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import Home from '../screens/HomeScreen';
import OrderDetails from '../screens/OrderDetails';

import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';


const Stack=createStackNavigator();

function UnsignedInStack(){
    return(

            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
            title: 'Walk4Health',
            headerStyle: {
              backgroundColor:"#009387"
            },
            headerShown: false
            
          }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{
            title: 'Walk4Health',
            headerStyle: {
              backgroundColor:"#009387"
            },
            headerShown: false
            
          }}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{
            title: 'Walk4Health',
            headerStyle: {
              backgroundColor:"#009387"
            },
            headerShown: false
            
          }}/>

            
            </Stack.Navigator>

    );
}

export default UnsignedInStack;