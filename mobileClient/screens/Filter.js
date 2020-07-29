import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,Modal,TouchableHighlight,AsyncStorage,Button} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const Filter=({route,navigation})=>{
    const [time, setTime]=useState();
    const [price,setPrice]=useState({price1:'', price2: ''});
    const [distance, setDistance]=useState({distance1:'', distance2: ''});
    const [age, setAge]=useState({age1:'', age2:''});
    const [index, setIndex]=useState(0);
    const [lists, setLists]=useState([]);
    const {zipcode}=route.params;
    console.log(zipcode);
    var radio_props = [
        {label: 'male', value: 0 },
        {label: 'female', value: 1 },
        {label: 'other', value: 2}
      ];
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
    const genders=['male', 'female','other'];

    const onFilter=async()=>{
        try{
            const token=await bootstrapAsync();
            console.log(token);
            const distance1=distance.distance1;
            const distance2=distance.distance2;
            const price1=price.price1;
            const price2=price.price2;
            const age1=age.age1;
            const age2=age.age2;
            const gender=genders[index];
            console.log(index);
            console.log(genders);
            console.log(gender);
            const body={time,distance1,distance2,price1,price2,age1,age2,gender,zipcode};
            console.log(body);
            const response= await fetch("http://localhost:5000/filter/",{
                method: "POST",
                headers: {"Content-Type": "application/json",
                    'Authorization': `Bearer `+token},
                body: JSON.stringify(body)
            });
            const jsonData= await response.json();
            setLists(jsonData);
        }catch(err){
            console.error(err.message);
        }
    }

    return(
        <View>
            <Text>start time</Text>
            <TextInput 
            placeholder='start time'
            onChangeText={(val)=>{setTime(val)}
            }   
            />
            <Text>price range</Text>
            <TextInput 
            placeholder='low'
            onChangeText={(val)=>{setPrice({
                ...price,
                price1: val
            })
            }
            }/>
            <TextInput 
            placeholder='high'
            onChangeText={(val)=>{setPrice({
                ...price,
                price2: val
            })
            }
            }/>

            <Text>distance range</Text>
            <TextInput 
            placeholder='low'
            onChangeText={(val)=>{setDistance({
                ...distance,
                distance1: val
            })
            }
            }/>
            <TextInput 
            placeholder='high'
            onChangeText={(val)=>{setDistance({
                ...distance,
                distance2: val
            })
            }
            }/>
            
            <Text>age range</Text>
            <TextInput 
            placeholder='low'
            onChangeText={(val)=>{setAge({
                ...age,
                age1: val
            })
            }
            }/>
            <TextInput 
            placeholder='high'
            onChangeText={(val)=>{setAge({
                ...age,
                age2: val
            })
            }
            }/>

            <RadioForm
            radio_props={radio_props}
            initial={0}
             onPress={(value) => {setIndex(value)}}
            />

            <Button title="Filter" onPress={onFilter}/>

            
                <Table >
                <Row data={head} style={styles.head}  textStyle={styles.text}></Row>
                    {lists.map((list)=>(
                        <TableWrapper key={list.id}  style={styles.row}>
                   
                        <Cell textStyle={styles.text} data={list.time}/>    
                        <Cell textStyle={styles.text} data={list.zipcode}/>
                        <Cell textStyle={styles.text} data={list.price}/>
                      
                        <Cell textStyle={styles.text}
                        data={list.creator_id}/>
                            
                        </TableWrapper>
                    ))
                    }
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

export default Filter;