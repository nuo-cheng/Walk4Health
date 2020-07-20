import React, {Fragment, useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    AsyncStorage
} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import Mytabs from './MainTabScreen'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const Orders = ({route,navigation}) => {
    const listOptions = [
        { label: "Created", value: "created" },
        { label: "Partnered", value: "partnered" }
      ];

    async function bootstrapAsync() {
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
    
    const [lists, setLists]= useState([]);
    // console.log("route.params==========="+route.params);
    // const token = route.params.req;
    // console.log("up " + token.accessToken);  
    

    const getLists=async(name = "created")=>{
        try{
            // console.log("into get");
            // console.log(token.accessToken);
            const token=await bootstrapAsync();
            console.log("orders token: " + token);
            console.log(name);
            // var response = null;
            if (name === 'created'){
                const response= await fetch("http://localhost:5000/posts/created", {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                })
                const jsonData= await response.json();
           
                setLists(jsonData);
            } else if (name === "partnered"){
                const response= await fetch("http://localhost:5000/posts/accepted", {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                })
                const jsonData= await response.json();
           
                setLists(jsonData);
            }
            
            // console.log("finish response")
            
            // const jsonData= await response.json();
           
            // setLists(jsonData);
            // console.log(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(()=> {
        console.log("useEffect");
        getLists();
    }, []);

    console.log("======================"+lists);

    const head=["Post Id", "Zipcode", "Receiver Id", "Done", "Review"];
    return (

        <View>

            <Text>Orders</Text>
            <View>
                <SwitchSelector
                    options={listOptions}
                    initial={0}
                    onPress={value => getLists(value)}
                />
            </View>
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
                    <Cell textStyle={styles.text} data={list.receiver_id}/>
                    <Cell textStyle={styles.text} data={list.done}/>
                    <Cell textStyle={styles.text} data={list.done}/>
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

export default Orders;