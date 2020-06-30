import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'

import Home from '../screens/Home'
import Items from '../screens/Items'

const screens={
    Home:{
        screen: Home
    },
    Items:{
        screen: Items
    }
}

const HomeStack=createStackNavigator(screens);
export default createAppContainer(HomeStack);