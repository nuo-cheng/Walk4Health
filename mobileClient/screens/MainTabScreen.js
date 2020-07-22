import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Lists from './Explore'

import CreateOrder from '../screens/CreateOrder';

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
            <Tab.Screen name="New Post" component={CreateOrder}/>
            <Tab.Screen name="History" component={MyPosts}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>

    );
}

export default Mytabs;