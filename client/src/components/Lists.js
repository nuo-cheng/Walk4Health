import React, {Fragment, useEffect, useState} from "react";

import Items from "./Items";

const Lists=() =>{
    const [lists, setLists]= useState([]);

    const deleteList= async id =>{
        try{
            const deleteList=await fetch(`http://localhost:5000/deletelist/${id}`,{
                method: "DELETE"
            });
            
            setLists(lists.filter(list=>list.list_id !==id));
        }catch(err){
            console.error(err.message);
        }
    }

    const getLists=async()=>{
        try{
            const response= await fetch("http://localhost:5000/lists");
            const jsonData= await response.json();

            setLists(jsonData);
            console.log(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(()=> {
        getLists();
    }, []);

    console.log(lists);
    return(
        <Fragment>
            {""}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>List Id</th>
                        <th>Description</th>
                        
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map(list=>(
                        <tr key={list.list_id}>
                            <td>
                                {list.list_id}
                            </td>

                        <td>
                            
                            <Items list={list} />
                        </td>
                        
                        <td><button className="btn btn-danger" onClick={()=>deleteList(list.list_id)}>Delete 
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Lists;