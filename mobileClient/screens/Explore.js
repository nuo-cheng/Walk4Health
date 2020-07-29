import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Button,Modal,TouchableOpacity, TouchableHighlight,AsyncStorage} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Lists from "../components/Lists"

export default function Home({route,navigation}) {
    const [modalVisible, setModalVisible]=useState(false);
    const [searchInput, setSearchInput]=useState();
    const head=["Time", "ZipCode", "Price","Creator Id"];
    const [lists, setLists]= useState([]);

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


    const searchOrders=async()=>{
      try{
          const token=await bootstrapAsync();
          
          const response= await fetch(`http://localhost:5000/search/byzipcode/${searchInput}`, {
              method: "GET",
              headers: {"Content-Type": "application/json",
              'Authorization': `Bearer ` + token},
              // body: JSON.stringify(searchInput)
          });
          const jsonData= await response.json();
          setLists(jsonData);
          setModalVisible(true);
      }catch(err){
          console.error(err.message);
      }
  }
    return (
      <View >
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }
      }
      >
        <Table >
                <Row data={head} style={styles.head}  textStyle={styles.text}></Row>
                
                    {lists.map((list)=>(
                        <TableWrapper key={list.id}  style={styles.row}>
                        
                        <Cell textStyle={styles.text} data={list.time}/>    
                        <Cell textStyle={styles.text} data={list.zipcode}/>
                        <Cell textStyle={styles.text} data={list.price}/>
                        
                    
                        <Cell textStyle={styles.text}
                        data={list.creator_id}/>
                            
                        </TableWrapper>
                    ))}
                
            </Table>

        <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
        </TouchableHighlight>
      </Modal> */}



        {/* <CreateList navigation={navigation}/> */}

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

      {/* <Button title="Search" style={[styles.signIn, {
                        borderColor: '#009387',
                        backgroundColor: '#009387',
                        borderWidth: 1,
                        marginTop: 120
                    }]} onPress={()=>navigation.navigate('TabScreen',{
          screen: 'Explores',
          params:{
            screen: 'Search', params:{
                input: searchInput
            }
          }})}/> */}
      {/* <View style={styles.button}>
     <TouchableOpacity style={[styles.signIn, {
                        borderColor: '#009387',
                        backgroundColor: '#009387',
                        borderWidth: 1,
                        marginTop: 10
                    }]}
                    onPress={()=>navigation.navigate('TabScreen',{
                      screen: 'Explores',
                      params:{
                        screen: 'Search', params:{
                            input: searchInput
                        }
                      }})}>
            <Text style={[styles.textSign, {
                        color:'#ffffff',

                    }]}>Search</Text>
            
        </TouchableOpacity>
        </View> */}
        


{/* <Button title="Filter" style={[styles.signIn, {
                        borderColor: '#009387',
                        backgroundColor: '#009387',
                        borderWidth: 1,
                        marginTop: 120
                    }]} onPress={()=>navigation.navigate('TabScreen',{
          screen: 'Explores',
          params:{
            screen: 'Filter',
            params:{
              zipcode: searchInput
            }
          }})}/> */}
        {/* <TouchableHighlight
        style={styles.openButton}
        onPress={()=>navigation.navigate('TabScreen',{
          screen: 'Explores',
          params:{
            screen: 'Search', params:{
                input: searchInput
            }
          }
        })}
      > 
      
      </TouchableHighlight> */}
      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={()=>navigation.navigate('TabScreen',{
          screen: 'Explores',
          params:{
            screen: 'Filter'
            
            
          }
        })}
      ><View>
      <Text style={styles.textStyle}>Filter</Text>
      </View></TouchableHighlight> */}
        {/* <Text>Filter        sort by distance</Text> */}
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