import React, {Fragment, useState} from "react";

const CreateList=()=>{
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
        <Fragment>
            <h1 className="text-center mt-5"> Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <label>Description:</label>
                <input type="text" className="form-control"
                value={description}
                onChange={e=> setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add List</button>
            </form>
        </Fragment>

    );
};

export default CreateList;