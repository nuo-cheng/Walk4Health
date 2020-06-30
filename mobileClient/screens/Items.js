import React, {Fragment, useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { FlatList } from "react-native-gesture-handler";
import CreateItem from "../components/CreateItem";

const Items=({navigation})=>{
    console.log(navigation);
    const [items, setItems]= useState([]);
    const list=navigation.getParam('list');
    console.log(list);
    const getItems= async(id)=>{
        try {
            const response=await fetch(`http://localhost:5000/items/${id}`,{method:"GET"});
            const jsonData=await response.json();
            setItems(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    };

    useEffect(() => {
        getItems(list.list_id);
      }, []);

      const updateItem = async id => {
        try {
          const updateItem = await fetch(`http://localhost:5000/updateitem/${id}`, {
            method: "PUT"
          });
          getItems(list.list_id);
        } catch (err) {
          console.error(err.message);
        }
      };

      const deleteItem = async id => {
        try {
          const deleteItem = await fetch(`http://localhost:5000/deleteitem/${id}`, {
            method: "DELETE"
          });
    
          setItems(items.filter(item => item.item_id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

      const head=["Description", "Done?", "Update","Delete"];

      const updateButton = (item) =>(
        <TouchableOpacity onPress={()=>updateItem(item.item_id)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Update</Text>
          </View>
        </TouchableOpacity>
    )

    const deleteButton = (item) =>(
        <TouchableOpacity onPress={()=>deleteItem(item.item_id)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Delete</Text>
          </View>
        </TouchableOpacity>
    )

    return (
        <View>
            <Text>{list.description}</Text>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={head}/>
                    {items.map((item)=>(
                        <TableWrapper key={item.item_id} style={styles.row}>
                         
                        <Cell data={item.description}/>
                        <Cell data={item.done.toString()}/>
                        <Cell data={updateButton(item)} />
                        <Cell data={deleteButton(item)}/>
                           
                        
                
                        </TableWrapper>
                    ))}
                
            </Table>
        
            <CreateItem list={list} getItems={getItems}/>


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

export default Items;