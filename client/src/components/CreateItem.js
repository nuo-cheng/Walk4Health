import React, {Fragment, useState} from "react";

const CreateItem=()=>{
    const [description, setDescription] = useState("");
    const [list_id, setListId]=useState("");

    const onSubmitForm= async e=>{
        e.preventDefault();
        try{
            const body= {description, list_id};
            const response= await fetch("http://localhost:5000/createitem",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location="/";
            console.log(response);
        }catch(err){
            console.error(err.message);
        }
    }
    return(
        <Fragment>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <label>Description:</label>
                <input type="text" className="form-control"
                value={description}
                onChange={e=> setDescription(e.target.value)}
                />
                <label>List_Id:</label>
                <input type="text" className="form-control"
                value={list_id}
                onChange={e=> setListId(e.target.value)}
                />
                <button className="btn btn-success">Add Item</button>
            </form>
        </Fragment>

    );
};

export default CreateItem;