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
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationActions } from 'react-navigation';
import UpdateOrder from '../screens/UpdateOrder';


const OrderDetails = ({route, navigation}) => {

    const [order, setOrder]= useState({});
    const { id } = route.params;
    const [updateOpen, setUpdateOpen] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        check_textInputChange: false
    });


    async function bootstrapAsync() {
        let token;
        try {
          token = await AsyncStorage.getItem('userToken');

          return token;
        } catch (error) {
          // Restoring token failed
          console.log(error.message);
        }
        return;
    }

    const deleteOrder = async() => {
        try {
            const token=await bootstrapAsync();
            const response= await fetch(`http://localhost:5000/posts/${id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                })
            const jsonData= await response.json();
            navigation.navigate('Orders');

        } catch (error) {
            console.log(error.message);
        }
    }

    const getOrder = async()=>{
        try {
            const token=await bootstrapAsync();
            const response= await fetch(`http://localhost:5000/posts/${id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                })
            const jsonData= await response.json();
            setOrder(jsonData);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=> {

        getOrder();
    }, []);




    return (
       
        <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
        <Grid>
                <Col>
                    <Text>Order Number # </Text>
                    <Text>Finished:   </Text>
                    <Text>Review: </Text>
                </Col>
                <Col>
                    <Text>{order.id} </Text>
                    <Text>{String(order.done)} </Text>
                    <Text>{order.review} </Text>
                </Col>
            </Grid>
            {/* <Text style={styles.text_header}>Order Number #{order.id}</Text>
            <Text style={styles.text_header}>Finished:  {order.done.toString()}</Text>
            <Text style={styles.text_header}>Review: {order.review}</Text> */}
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                // backgroundColor: colors.background
            }]}
        
        >
        
        <View style={styles.container_white}>

            <Grid>
                <Col>
                    <Text>Reveiver Id: </Text>
                    <Text>Time: </Text>
                    <Text>Zipcode: </Text>
                    <Text>Price: </Text>
                    <Text>Distance: </Text>
                </Col>
                <Col>
                    <Text>{order.receiver_id} </Text>
                    <Text>{order.time} </Text>
                    <Text>{order.zipcode} </Text>
                    <Text>{order.price} </Text>
                    <Text>{order.distance} </Text>
                </Col>
            </Grid>
        </View>
            
            {order.receiver_id===null

            ?<View>
            <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => setUpdateOpen(true)}
                >
                    <Text style={[styles.textSign, {
                        color:'#009387'
                    }]}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => deleteOrder()}
                >
                    <Text style={[styles.textSign, {
                        color:'#009387'
                    }]}>Delete</Text>
            </TouchableOpacity>
            </View>
            :<View>
            <Text>This order has been accept by a partner</Text>
            <Text>This order can not be changed and deleted</Text>
            </View>
                }

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

            
            <View >
                <Modal visible={updateOpen} style={styles.infoContainer}>
                    {/* console.log("test===========before into child component", user); */}
                    <UpdateOrder  order={order} setOrder = {setOrder}  orderInfo = {orderInfo} setOrderInfo = {setOrderInfo} signal = {updateOpen} setSignal = {setUpdateOpen}/>
                </Modal>
            </View>
        </View>

        
    )
}

export default OrderDetails;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    container_white: {
        flex: 1, 
        backgroundColor: '#fff'
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
    wrapper: { flexDirection: 'column' },
  });
