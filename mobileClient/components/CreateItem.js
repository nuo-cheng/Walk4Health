import React, {Fragment, useState} from "react";
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

const CreateItem=({ list, getItems})=>{
    const [description, setDescription] = useState("");
    // const [list_id, setListId]=useState("");

    const onSubmitForm= async e=>{
        e.preventDefault();
        const list_id=list.list_id;
        try{
            const body= {description, list_id};
            const response= await fetch("http://localhost:5000/createitem",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            
            getItems(list_id);
            console.log(response);
        }catch(err){
            console.error(err.message);
        }
    }
    return(
        <Fragment>
            <Text>Description:</Text>
            <TextInput
            placeholder="Item Description"
            onChangeText={(text)=>{setDescription(text)}}/>
           
            <Button title="Add Item" onPress={onSubmitForm}/>
        </Fragment>

    );
};

export default CreateItem;