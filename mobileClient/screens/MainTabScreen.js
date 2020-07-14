import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import homeStack from '../routes/homeStack'
import Home from '../screens/Home'
import Items from '../screens/Items'

function Profile(){
    return(
        <Text>I'm ***</Text>
    );
}

function NewPost(){
    return(
        <Text>New Post</Text>
    );
}

function MyPosts(){
    return(
        <Text>My Posts</Text>
    );
}


const HomeStack=createStackNavigator();
function HomeStackScreen(){
    return(
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home}/>
        <HomeStack.Screen name="Items" component={Items}/>
    </HomeStack.Navigator>
    );
}

const Tab=createMaterialBottomTabNavigator();

function Mytabs(){
    return(
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackScreen}/>
            <Tab.Screen name="New Post" component={NewPost}/>
            <Tab.Screen name="My Posts" component={MyPosts}/>
            {/* <Tab.Screen name="Profile" component={Profile}/> */}
        </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Mytabs;