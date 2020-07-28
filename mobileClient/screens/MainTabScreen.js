import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import homeStack from '../routes/homeStack'


import Items from '../screens/Items'
import Orders from '../screens/Orders'
import Profile from '../screens/Profile';
import OrderDetails from '../screens/OrderDetails';

import Search from '../screens/Search';
import Filter from '../screens/Filter';

import Lists from './Explore'

import CreateOrder from '../screens/CreateOrder';
import ExploreDetail from './ExploreDetail';
import { NavigationContainer } from '@react-navigation/native';


function Posts(){
    return(
        <Text>Posts</Text>
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
const OrderNav=createStackNavigator();

function OrderScreen({navigation}){
    return (
        <OrderNav.Navigator>
            <Tab.Screen name="Orders" component={Orders} options={{
            headerShown: true,
            headerStyle: {
                backgroundColor:"#009387"
              },
            }} />
            <Tab.Screen name="OrderDetails" component={OrderDetails} options={{
            headerShown: true,
            headerStyle: {
                backgroundColor:"#009387"
              },
            }}/>
        </OrderNav.Navigator>
    )
}
const ExploreStack=createStackNavigator();

function ExploreScreens({navigation}){
    return(
        <ExploreStack.Navigator>
            <ExploreStack.Screen name="Explore" component={Lists} options={{
            headerShown: true,
            headerStyle: {
                backgroundColor:"#009387"
              },
            }}/>
            <ExploreStack.Screen name="Search" component={Search} options={{
            headerShown: true,
            headerStyle: {
                backgroundColor:"#009387"
              },
            }}/>
            <ExploreStack.Screen name="Filter" component={Filter} 
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor:"#009387"
                  },
                }}
            />
            <ExploreStack.Screen name="Detail" component={ExploreDetail}
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor:"#009387"
                  },
                }}
            />
        </ExploreStack.Navigator>
    )
}

const NewPostStack=createStackNavigator();
function NewPost(){
    return(
        <NewPostStack.Navigator>
        <NewPostStack.Screen name="New Post" component={CreateOrder} options={{
            headerShown: true,
            headerStyle: {
                backgroundColor:"#009387"
              },
            }}/>
            </NewPostStack.Navigator>
    )
}

const ProfileStack=createStackNavigator();
function ProfileScreen(){
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={Profile}  options={{
            headerShown: true,
            headerStyle: {
                backgroundColor:"#009387"
              },
            }}/>
        </ProfileStack.Navigator>
    )
}


function Mytabs(){
    return(

        <Tab.Navigator>
            <Tab.Screen name="Explores" component={ExploreScreens} options={{ title: 'Explore' }}/>
            <Tab.Screen name="New Post" component={NewPost} options={{ title: 'New Post' , headerShown: true}}/>
            <Tab.Screen name="Orders" component={OrderScreen} options={{ title: 'Orders'}}/>
            <Tab.Screen name="My Profile" component={ProfileScreen} options={{ title: 'My Profile' , headerShown: true}}/>
        </Tab.Navigator>

    );
}

export default Mytabs;