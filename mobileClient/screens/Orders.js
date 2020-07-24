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
        console.log("useEffect");
        getLists();
    }, []);

    console.log("======================"+lists);

    const headCreated=["Post Id", "Zipcode", "Receiver Id", "Done", "Review"];
    const headPartned=["Post Id", "Zipcode", "Creator Id", "Done", "Review"];

    const elementCreated = (clickValue, done, review, id) => {
        if (review !== undefined && review !== null){
            return (
                <Text>{review}</Text>
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
       
    const elementPartneredDone = (clickValue, done, id) => {
        if (done){
            return (
                <Text>Finished</Text>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {updateDone(id)}}>
                <View style={styles.btn}>
                <Text style={styles.btnText}>Done!</Text>
                </View>
                </TouchableOpacity>
            )
        }
    }
    

    const elementPartneredCopy = (clickValue, done) => (
        <TouchableOpacity disabled={!done}>
          <View style={styles.btn}>
              {/* if (clickValue === "created"){
                  <Text style={styles.btnText}>review</Text>
              } else if (clickValue === "partnered"){
                  <Text style={styles.btnText}>done</Text>
              } */}
              {clickValue === "created"
          ? <Text style={styles.btnText}>review</Text>
          : <Text style={styles.btnText}>done</Text>
        }
          </View>
        </TouchableOpacity>
      );
    return (

        <View>

           
            <Modal visible={modalOpen}>
                <View style={{marginTop: 200}}>
                    <Text style={{textAlign: 'center'}}>Please give a review</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={score}
                        selectedStar={(rating) => setScore(rating)}
                    />
                    <Text style={{textAlign: 'center'}}>You select {score} stars!</Text>
                    <TouchableOpacity style={{alignItems: "center"}} onPress = {() => setModalOpen(false)}>
                        <View style={styles.btn}>
                        <Text style={styles.btnText}>close</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "center"}} onPress = {() => giveReview(scoreId, score)}>
                        <View style={styles.btn}>
                        <Text style={styles.btnText}>submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>


            <Text>Orders</Text>
            <View>
                <SwitchSelector
                    options={listOptions}
                    initial={0}
                    onPress={value => getClickValue(value)}
                />
            </View>

            {clickValue === "created"
            ? <Table >
                <Row data={headCreated} style={styles.head}  textStyle={styles.text}></Row>
                {lists.map((list)=>(
                    <TableWrapper key={list.id}  style={styles.row}>
                    {/* <Cell textStyle={styles.text} data={list.list_id}/>    
                    <Cell textStyle={styles.text} data={listLink(list)}/> */}
                    <Cell textStyle={styles.text} data={list.id}/>    
                    <Cell textStyle={styles.text} data={list.zipcode}/>
                        
                    
                    {/* <Cell textStyle={styles.text}
                    data={deleteButton(list.list_id)}/> */}
                    <Cell textStyle={styles.text} data={list.receiver_id}/>
                    <Cell textStyle={styles.text} data={list.done.toString()}/>
                    <Cell textStyle={styles.text} data={elementCreated(clickValue, list.done, list.rating, list.id)}/>
                    </TableWrapper>
                ))}
            </Table>
            : <Table >
                <Row data={headPartned} style={styles.head}  textStyle={styles.text}></Row>
                {lists.map((list)=>(
                    <TableWrapper key={list.id}  style={styles.row}>
                    {/* <Cell textStyle={styles.text} data={list.list_id}/>    
                    <Cell textStyle={styles.text} data={listLink(list)}/> */}
                    <Cell textStyle={styles.text} data={list.id}/>    
                    <Cell textStyle={styles.text} data={list.zipcode}/>
                        
                    
                    {/* <Cell textStyle={styles.text}
                    data={deleteButton(list.list_id)}/> */}
                    <Cell textStyle={styles.text} data={list.receiver_id}/>
                    <Cell textStyle={styles.text} data={elementPartneredDone(clickValue, list.done, list.id)}/>
                    <Cell textStyle={styles.text} data={list.rating}/>
                    </TableWrapper>
                ))}
            </Table>
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
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
  }
  });

export default Orders;