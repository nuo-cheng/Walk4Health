import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabScreen from "../screens/MainTabScreen"
import Lists from '../screens/Lists'
import Items from '../screens/Items'
import SignUp from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import Home from '../screens/HomeScreen';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';


const Stack=createStackNavigator();


function GlobalNav(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="TabScreen" component={TabScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default GlobalNav;