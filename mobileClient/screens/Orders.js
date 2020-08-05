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
import Star from 'react-native-star-view';
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

    const [clickValue, setClickValue] = useState("created");
    const [modalOpen, setModalOpen] = useState(false);
    const [scoreId, setScoreId] = useState();
    const [score, setScore] = useState(5);
    
    const getClickValue=async(name="created")=>{
        getLists(name);
        setClickValue(name);
    }

    const getLists=async(name = "created")=>{
        try{
            const token=await bootstrapAsync();


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
            

        }catch(err){
            console.error(err.message);
        }
    };

    const popup = async(open, post_id)=>{
        setModalOpen(open);
        setScoreId(post_id);
    }

    const giveReview=async(post_id, rating)=>{
        try {
            const token=await bootstrapAsync();
            const body = {rating};
            const response= await fetch(`http://localhost:5000/posts/${post_id}/review`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                body: JSON.stringify(body)
                })
            const jsonData= await response.json();
            getLists("created");
            setModalOpen(false);
        } catch (error) {
            console.error(err.message);
        }
    }

    const updateDone = async(id) => {
        try {
            const token=await bootstrapAsync();
            const body = {id};
            const response= await fetch(`http://localhost:5000/posts/${id}/done`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",
                'Authorization': `Bearer ` + token},
                body: JSON.stringify(body)
                })
            const jsonData= await response.json();
            getLists("partnered");
        } catch (error) {
            console.error(err.message);
        }
    }



    useEffect(()=> {
        getClickValue();
    }, []);



    const headCreated=["Time", "Zipcode", "Partner Name", "Status"];
    const headPartned=["Time", "Zipcode", "Customer Name", "Status"];

    const elementCreated = (clickValue, done, review, id) => {
        if (review !== undefined && review !== null){
            return (
                <Star score={review} style={styles.starStyle} />
            )
        } else if (review !== undefined && review === null && clickValue === "created" && done === true){
            return (
                <TouchableOpacity onPress = {() => popup(true, id)}>
                    <View style={styles.btn}>
                    <Text style={styles.btnText}>review</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <Text> </Text>
        }
    }
       
    const elementPartneredDone = (clickValue, done, id, review) => {
        if (review !== null){
            return (
                <Star score={review} style={styles.starStyle} />
            )
        } else if (done){
            return (
                <Text>Finished</Text>
            )
        } else{
            return (
                <TouchableOpacity onPress={() => {updateDone(id)}}>
                <View style={styles.btn}>
                <Text style={styles.btnText}>Done!</Text>
                </View>
                </TouchableOpacity>
            )
        }
    }
    

    
    return (

        <View>

           
            <Modal visible={modalOpen}>
                <View style={{marginTop: 200}}>
                    <Text style={styles.head_text_big}>Please give a review</Text>
                    <View marginLeft={50} marginRight={50} marginTop={50} marginBottom={30}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={score}
                        selectedStar={(rating) => setScore(rating)}
                        fullStarColor={'#009387'}
                        alignItems={"center"}
                        
                    />
                    </View>
                    <Text style={styles.head_text_big}>You select {score} stars!</Text>

                    <TouchableOpacity style={{alignItems: "center"}} onPress = {() => giveReview(scoreId, score)}>
                        <View style={{borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15,
                                width: '60%',
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10}}>
                        <Text style={styles.textSign}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{alignItems: "center"}} onPress = {() => setModalOpen(false)}>
                        <View style={{borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15,
                                width: '60%',
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10}}>
                        <Text style={styles.textSign}>Close</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </Modal>


            <View>
                <SwitchSelector
                    options={listOptions}
                    initial={0}
                    onPress={value => getClickValue(value)}
                    textColor='#009387' //green same as login
                    selectedColor='#FFFFFF'//white
                    selectedTextStyle={styles.head_text_white}
                    buttonColor="#a751e8"
                    borderColor="#a751e8"
                    style={styles.head_text}
                    textStyle={styles.head_text}
                />
            </View>

            {clickValue === "created"
            ? <Table >
                <Row data={headCreated} style={styles.head}  textStyle={styles.head_text_white}></Row>
                {lists.map((list, index)=>(
                    <TableWrapper key={index}  style={[styles.row, index%2 && {backgroundColor: '#b2dedb'}]}>

                    <Cell textStyle={styles.text} data={list.time} onPress={()=>navigation.navigate('OrderDetails', {id:list.id, creatorId: list.creator_id})}/>    
                    <Cell textStyle={styles.text} data={list.zipcode}/>

                    <Cell textStyle={styles.text} data={list.receiver_name}/>

                    <Cell textStyle={styles.text} data={elementCreated(clickValue, list.done, list.rating, list.id)}/>
                    </TableWrapper>
                ))}
            </Table>
            : <Table >
                <Row data={headPartned} style={styles.head}  textStyle={styles.head_text_white}></Row>
                {lists.map((list, index)=>(
                    <TableWrapper key={index}  style={[styles.row, index%2 && {backgroundColor: '#b2dedb'}]}>

                    <Cell textStyle={styles.text} data={list.time} onPress={()=>navigation.navigate('OrderDetails', {id:list.id})}/>    
                    <Cell textStyle={styles.text} data={list.zipcode}/>
                        
                    


                    <Cell textStyle={styles.text} data={list.creator_name}/>

                    <Cell textStyle={styles.text} data={elementPartneredDone(clickValue, list.done, list.id, list.rating)}/>
                    </TableWrapper>
                ))}
            </Table>
            }
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor:'#009387' ,borderTopLeftRadius: 20,
    borderTopRightRadius: 20, borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,},
    head_text: {fontSize: 15, margin: 6 , fontWeight:'bold', color: '#05375a', textAlign: 'center'},
    head_text_big: {fontSize: 22, margin: 6 , fontWeight:'bold', color: '#05375a', textAlign: 'center'},
    head_text_white: {fontSize: 15, margin: 6 , fontWeight:'bold', color: '#FFFFFF', textAlign: 'center'},
    text: { paddingVertical: 6, margin: 6 , fontWeight:'bold', color: '#05375a', textAlign: 'center'},
    row: { flexDirection: 'row', borderTopLeftRadius: 15,
    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15},
    btn: { width: 58, height: 18, backgroundColor: '#a751e8',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    },
    middle: {
        flex: 0.3,
        backgroundColor: "beige",
        borderWidth: 5,
    },
    bottom: {
        flex: 0.3,
        backgroundColor: "pink",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    starStyle: {
        width: 80,
        height: 20,
    },
    container_star: {
        flex: 3,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    signIn: {
        width: '60%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    textSign: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#009387'
    },
  });

export default Orders;