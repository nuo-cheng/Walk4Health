import * as React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import Navigator from './routes/Nav'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UnsignedInStack from './routes/Nav'
import TabScreen from "./screens/MainTabScreen"


export const AuthContext=React.createContext();

async function getToken() {
  let token;
  try {
    token = await AsyncStorage.getItem('userToken');
    
    return token;
  } catch (e) {
    // Restoring token failed
    console.log(e.message);
  }
  return;
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
    const [state, dispatch]=React.useReducer(
    (preveState, action)=>{
      switch(action.type){
        case "RESTORE_TOKEN":
          return{
            ...preveState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return{
            ...preveState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return{
            ...preveState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(()=>{
    const bootstrapAsync=async()=>{
      let userToken;
      try{
        userToken= await getToken();
      }catch(e){
        console.log(e);
      }
      console.log(userToken);
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }
    bootstrapAsync();
  },[]);

  const authContext=React.useMemo(
    ()=>({
      signIn: async (email, password)=>{
        let userToken;
        try{
          const body={email,password};
          const response= await fetch("http://localhost:5000/users/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const content = await response.json();
            console.log(content.accessToken);
            userToken=content.accessToken;
        }catch(e){
          console.error(e.message);
        }
        try{
          console.log(userToken);
          await AsyncStorage.setItem('userToken', userToken);
        }catch(error){
          console.log(error);
        }
        dispatch({type: 'SIGN_IN', token: userToken});
      },
      signOut:()=> dispatch({type: 'SIGN_OUT'}),
      // async() =>{
      //   await AsyncStorage.removeItem('userToken');
      //   dispatch({type: 'SIGN_OUT'})
      // },
      signUp: async data=>{
        let userToken;
        try{
          const email = data.email;
          const password = data.password;
          const gender = data.gender;
          const age = data.age;
          const body= {email, password, gender, age};
          const stringfiedBody=JSON.stringify(body);
          console.log('bodybodybody', body);
          const response= await fetch("http://localhost:5000/users/signup",{
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: stringfiedBody
          });
          const content=await response.json();
          console.log(content);
          userToken=content.accessToken;
          console.log(userToken);
        }catch(err){
          console.error(err.message);
      }
          try{
            await AsyncStorage.setItem('userToken', userToken);
          }catch(error){
            console.log(error);
          }
      dispatch({ type: 'SIGN_IN', token: userToken });
      
      },
    }),
    []
  );

    const Stack=createStackNavigator();


  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator>
        {state.isLoading?(
          <Stack.Screen name="Splash" component={SplashScreen}/>
        ):state.userToken==null?(
          <Stack.Screen name="Home" component={UnsignedInStack} />
          
        ):(
          <Stack.Screen name="TabScreen" component={TabScreen}/>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
    

  );
}


