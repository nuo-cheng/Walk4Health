import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import homeStack from '../routes/homeStack'
import Lists from '../screens/Lists'
import Items from '../screens/Items'

function Profile(){
    return(
        <Text>I'm ***</Text>
    );
}

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
            <Tab.Screen name="New Post" component={NewPost}/>
            <Tab.Screen name="My Posts" component={MyPosts}/>
            {/* <Tab.Screen name="Profile" component={Profile}/> */}
        </Tab.Navigator>

    );
}

export default Mytabs;