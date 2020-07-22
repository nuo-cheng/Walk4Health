import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import homeStack from '../routes/homeStack'
import Lists from '../screens/Lists'
import Items from '../screens/Items'
import Profile from '../screens/Profile';

=======

import Lists from './Explore'

import CreateOrder from '../screens/CreateOrder';
>>>>>>> ad28ed375d7755d7b01cc009bb7c72cdedcf1dbc


function Posts(){
    return(
        <Text>Posts</Text>
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


// const HomeStack=createStackNavigator();
// function HomeStackScreen(){
//     return(
//     <HomeStack.Navigator>
//         <HomeStack.Screen name="Home" component={Home}/>
//         <HomeStack.Screen name="Items" component={Items}/>
//     </HomeStack.Navigator>
//     );
// }

const Tab=createBottomTabNavigator();

function Mytabs(){
    return(

        <Tab.Navigator>
            <Tab.Screen name="Explore" component={Lists}/>
<<<<<<< HEAD
            <Tab.Screen name="New Post" component={NewPost}/>
            <Tab.Screen name="My Posts" component={MyPosts}/>
            <Tab.Screen name="My Profile" component={Profile}/>
            {/* <Tab.Screen name="Profile" component={Profile}/> */}
=======
            <Tab.Screen name="New Post" component={CreateOrder}/>
            <Tab.Screen name="History" component={MyPosts}/>
            <Tab.Screen name="Profile" component={Profile}/>
>>>>>>> ad28ed375d7755d7b01cc009bb7c72cdedcf1dbc
        </Tab.Navigator>

    );
}

export default Mytabs;