import React, {Fragment, useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



// import Items from "./Items";

const Lists=({navigation}) =>{
    const [lists, setLists]= useState([]);



    const deleteList= async id =>{
        try{
            const deleteList=await fetch(`http://localhost:5000/deletelist/${id}`,{
                method: "DELETE"
            });
            
            setLists(lists.filter(list=>list.list_id !==id));
        }catch(err){
            console.error(err.message);
        }
    }

    

    const getLists=async()=>{
        try{
            const response= await fetch("http://localhost:5000/lists");
            const jsonData= await response.json();

            setLists(jsonData);
            console.log(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(()=> {
        getLists();
    }, []);

    console.log(lists);

    
    const head=["List Id", "Description", "Delete"];

    const deleteButton = (list_id) => (
        <TouchableOpacity onPress={()=>deleteList(list_id)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Delete</Text>
          </View>
        </TouchableOpacity>
      );

    const listLink = (list) =>(
        <TouchableOpacity onPress={()=>navigation.navigate('Items', {list:list})}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{list.description}</Text>
          </View>
        </TouchableOpacity>
    )


    return(
        <View >
            <Table >
                <Row data={head} style={styles.head}  textStyle={styles.text}></Row>
                
                    {lists.map((list)=>(
                        <TableWrapper key={list.list_id}  style={styles.row}>
                        <Cell textStyle={styles.text} data={list.list_id}/>    
                        <Cell textStyle={styles.text} data={listLink(list)}/>
                        
                           
                        
                        <Cell textStyle={styles.text}
                        data={deleteButton(list.list_id)}/>
                        
                            
                        </TableWrapper>
                    ))}
                
            </Table>
        </View>
    );
                    };



const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

export default Lists;