import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'

import Lists from '../screens/Lists'
import Items from '../screens/Items'
import SignUp from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import Home from '../screens/HomeScreen';

const screens={
    Home: {
        screen: Home
    },
    SignUp: {
        screen: SignUp
    },
    SignIn: {
        screen: SignIn
    },
    Lists:{
        screen: Lists
    },
    Items:{
        screen: Items
    }
}

const HomeStack=createStackNavigator(screens);
export default createAppContainer(HomeStack);