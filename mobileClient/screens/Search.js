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
                <Row data={head} style={styles.head}  textStyle={styles.text}></Row>
                    {lists.map((list)=>(
                        <TableWrapper key={list.id}  style={styles.row}>
                        {/* <Cell textStyle={styles.text} data={list.list_id}/>    
                        <Cell textStyle={styles.text} data={listLink(list)}/> */}
                        <Cell textStyle={styles.text} data={list.time}/>    
                        <Cell textStyle={styles.text} data={list.zipcode}/>
                        <Cell textStyle={styles.text} data={list.price}/>
                        {/* <Cell textStyle={styles.text}
                        data={deleteButton(list.list_id)}/> */}
                        <Cell textStyle={styles.text}
                        data={list.creator_id}/>
                            
                        </TableWrapper>
                    ))}
                
            </Table>
        </View>
    )

}   

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

export default Search;