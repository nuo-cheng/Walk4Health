import React, { useState } from 'react';
import { StyleSheet,View, TextInput,Button,Modal,TouchableOpacity, TouchableHighlight,AsyncStorage} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Lists from "../components/Lists"

export default function Home({route,navigation}) {
   
    const [searchInput, setSearchInput]=useState();
   
   

    async function bootstrapAsync() {
      // var token;
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);
        return token;
      } catch (e) {
        // Restoring token failed
        console.log(e.message);
      }
      return;
  }

    return (
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginTop: 20,marginLeft: 10,marginRight:10}}>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 , width: "75%", marginLeft: 10}}
        placeholder='zipcode'
        onChangeText={
            (text)=>{
                setSearchInput(text);
            }
      }/>
      <View style={styles.action}>
                    <FontAwesome
                        name="search"
                        color="#009387"
                        size={30}
                        onPress={()=>navigation.navigate('TabScreen',{
                          screen: 'Explores',
                          params:{
                            screen: 'Search', params:{
                                input: searchInput
                            }
                          }})}
                    />
                </View>
      <View style={styles.action}>
                    <FontAwesome
                        name="filter"
                        color="#009387"
                        size={30}
                        onPress={()=>navigation.navigate('TabScreen',{
                          screen: 'Explores',
                          params:{
                            screen: 'Filter',
                            params:{
                              zipcode: searchInput
                            }
                          }})}
                    />
                </View>

      
      </View>
        <Lists route={route} navigation={navigation } />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signIn: {
      width: '30%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    button: {
      alignItems: 'center',
      marginTop: 0
    },
  });