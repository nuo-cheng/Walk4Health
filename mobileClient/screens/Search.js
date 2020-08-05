import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,Modal,TouchableHighlight,AsyncStorage} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const Search=({route,navigation})=>{
    const [lists, setLists]= useState([]);
    const {input}= route.params;
    console.log(input);
    const head=["Time", "ZipCode", "Price","Creator Id"];


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
            
            const response= await fetch(`http://localhost:5000/search/byzipcode/${input}`, {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
            });
            const jsonData= await response.json();
            setLists(jsonData);
            console.log(jsonData);
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=> {
        
        searchOrders();
    }, []);

    return(
        <View>
             <Table >
                <Row data={head} style={styles.head}  textStyle={styles.head_text_white}></Row>
                    {lists.map((list,index)=>(
                        <TableWrapper key={index}  style={[styles.row, index%2 && {backgroundColor: '#b2dedb'}]}>


                        <Cell textStyle={styles.text} data={list.time} onPress={()=>navigation.navigate('TabScreen',{
          screen: 'Explores',
          params:{
            screen: 'Detail',
            params:{
              id: list.id
            }
          }})}/>    
                        <Cell textStyle={styles.text} data={list.zipcode}/>
                        <Cell textStyle={styles.text} data={list.price}/>
 
                        <Cell textStyle={styles.text}
                        data={list.creator_name}/>
                            
                        </TableWrapper>
                    ))}
                
            </Table>
        </View>
    )

}   

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor:'#009387' ,borderTopLeftRadius: 20,
    borderTopRightRadius: 20, borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,},
    head_text_white: {fontSize: 15, margin: 6 , fontWeight:'bold', color: '#FFFFFF', textAlign: 'center'},
    text: { paddingVertical: 6, margin: 6 , fontWeight:'bold', color: '#05375a', textAlign: 'center'},
    row: { flexDirection: 'row', borderTopLeftRadius: 15,
    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15},
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

export default Search;