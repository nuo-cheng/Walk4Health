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
    AsyncStorage,
    Modal
} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import StarRating from 'react-native-star-rating-new';
import Mytabs from './MainTabScreen'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


const OrderDetails = ({route, navigation}) => {

    const [order, setOrder]= useState({});
    const { id } = route.params;
    console.log("Detail:::" + id);

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

    const getOrder = async()=>{
        try {
            const token=await bootstrapAsync();
            console.log("id in getOrder: "+ id);
            const response= await fetch(`http://localhost:5000/posts/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                })
            const jsonData= await response.json();
            console.log("jsonData"+ jsonData)
            const newjson=JSON.stringify(jsonData);
            var obj = JSON.parse(newjson);
            setOrder(obj);
            
        } catch (error) {
            console.error(err.message);
        }
    }

    useEffect(()=> {
        console.log("useEffect");
        getOrder();
    }, []);

    console.log("order: " + order);

    const row = [" 1", "2 "];
    const head=["Receiver Id", "Time", "Zipcode", "Price", "Distance"];
    // const orderData=[order.receiver_id, order.time, order.zipcode, order.price, order.distance];


    return (
       
        <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Order Number #</Text>
            <Text style={styles.text_header}>Finished: </Text>
            <Text style={styles.text_header}>Review: </Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                // backgroundColor: colors.background
            }]}
        
        >
            

        {/* <Table >
        
       
        <Row data={row} flexArr={[1, 2]} style={styles.head} textStyle={styles.text}/>
            {order.map((post)=>(
                
                <TableWrapper key={post.id}  style={styles.wrapper}>
                    
                <Col data={head}  style={styles.col} textStyle={styles.text}></Col>
                <Cell  textStyle={styles.text} data={post.receiver_id}/> 
                
                <Cell textStyle={styles.text} data={post.time}/>
                    
        
                <Cell textStyle={styles.text} data={post.zipcode}/>
                <Cell  textStyle={styles.text} data={post.price}/>
                <Cell  textStyle={styles.text} data={post.distance}/>
                </TableWrapper>
            ))}
                    
                
            </Table> */}



        
        

            <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => navigation.navigate('Orders')}
                >
                    <Text style={[styles.textSign, {
                        color:'#009387'
                    }]}>Return</Text>
                </TouchableOpacity>
                </Animatable.View>

        </View>
    )
}

export default OrderDetails;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    back:{
        width: '100%',
        height: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },

    wrapper: { flexDirection: 'col' },


    containernew: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
    headnew: { flex: 1, backgroundColor: '#c8e1ff' },
    title: { flex: 2, backgroundColor: '#f6f8fa' },
    titleText: { marginRight: 6, textAlign:'right' },
    textnew: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' }
  });
