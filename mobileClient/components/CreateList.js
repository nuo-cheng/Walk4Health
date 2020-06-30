import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';




const CreateList=({navigation})=>{
    const [description, setDescription] = useState("");

    const onSubmitForm= async e=>{
        e.preventDefault();
        try{
            const body= {description};
            const response= await fetch("http://localhost:5000/createlist",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            
            window.location="/";
        }catch(err){
            console.error(err.message);
        }
    }
    return(
        <View >
            <Text > Todo List</Text>
            <TextInput
            placeholder="description"
            onChangeText={(text)=>{setDescription(text)}}/>
            <Button title="Add List" onPress={onSubmitForm}/>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CreateList;