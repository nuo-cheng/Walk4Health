import React, {Fragment, useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



// import Items from "./Items";

const Lists=({navigation}) =>{
    const [lists, setLists]= useState([]);
    const token = navigation.getParam("req");
    console.log("up " + token.accessToken);

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

    // console.log("============================", JSON.stringify(content.accessToken));
    //         const response1 = await fetch("http://192.168.1.14:5000/lists",{
    //             method: "GET",
    //             headers: {"Content-Type": "application/json",
    //             'Authorization': `Bearer ` + content.accessToken
    //         }
    

    const getLists=async()=>{
        try{
            console.log("into get");
            console.log(token.accessToken);
            const response= await fetch("http://localhost:5000/posts/", {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token.accessToken},

            });
            console.log("finish response")
            
            const jsonData= await response.json();
           
            setLists(jsonData);
            // console.log(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(()=> {
        console.log("useEffect");
        getLists();
    }, []);

    console.log(lists);

    
    const head=["Post Id", "ZipCode", "Creator Id"];

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
                        <TableWrapper key={list.id}  style={styles.row}>
                        {/* <Cell textStyle={styles.text} data={list.list_id}/>    
                        <Cell textStyle={styles.text} data={listLink(list)}/> */}
                        <Cell textStyle={styles.text} data={list.id}/>    
                        <Cell textStyle={styles.text} data={list.zipcode}/>
                           
                        
                        {/* <Cell textStyle={styles.text}
                        data={deleteButton(list.list_id)}/> */}
                        <Cell textStyle={styles.text}
                        data={list.creator_id}/>
                            
                        </TableWrapper>
                    ))}
                
            </Table>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.item}>Log out</Text>
            </TouchableOpacity>
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