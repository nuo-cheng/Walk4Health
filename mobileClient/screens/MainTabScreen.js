import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import homeStack from '../routes/homeStack'


import Items from '../screens/Items'
import Orders from '../screens/Orders'
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Filter from '../screens/Filter';

import Lists from './Explore'

import CreateOrder from '../screens/CreateOrder';
import ExploreDetail from './ExploreDetail';


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

// function Orders(){
    
//         // navitation.navigate("Orders")
    
// }


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
const ExploreStack=createStackNavigator();

function ExploreScreens(){
    return(
        <ExploreStack.Navigator>
            <ExploreStack.Screen name="Explore" component={Lists}/>
            <ExploreStack.Screen name="Search" component={Search}/>
            <ExploreStack.Screen name="Filter" component={Filter}/>
            <ExploreStack.Screen name="Detail" component={ExploreDetail}/>
        </ExploreStack.Navigator>
    )
}


function Mytabs(){
    return(

        <Tab.Navigator>
            <Tab.Screen name="Explores" component={ExploreScreens}/>
            <Tab.Screen name="New Post" component={CreateOrder}/>
            <Tab.Screen name="Orders" component={Orders}/>
            <Tab.Screen name="My Profile" component={Profile}/>
        </Tab.Navigator>

    );
}

export default Mytabs;