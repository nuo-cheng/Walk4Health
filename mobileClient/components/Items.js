import React, { Fragment, useState, useEffect } from "react";

const Items=({list})=>{
    const [items, setItems]=useState([]);
const getItems= async()=>{
    try {
        const response=await fetch(`http://localhost:5000/items/${list.list_id}`,{method:"GET"});
        const jsonData=await response.json();
        setItems(jsonData);
    } catch (err) {
        console.error(err.message);
    };
};

useEffect(() => {
    getItems();
  }, []);

  const deleteItem = async id => {
    try {
      const deleteItem = await fetch(`http://localhost:5000/deleteitem/${id}`, {
        method: "DELETE"
      });

      setItems(items.filter(item => item.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateItem = async id => {
    try {
      const deleteItem = await fetch(`http://localhost:5000/updateitem/${id}`, {
        method: "PUT"
      });
      getItems();
    } catch (err) {
      console.error(err.message);
    }
  };


return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${list.list_id}`}
      >
        {list.description}
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${list.list_id}`}
        // onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Items</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              {/* <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              /> */}
                <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Done?</th>
                        <th>Upgrade</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                    <tbody>
                        
                    {items.map(item=>(
                        <tr key={item.item_id}>
                        <td>
                            {item.description}
                        </td>
                        
                        <td>
                            {item.done.toString()}
                        </td>

                        <td>
                        <button
                  className="btn btn-danger"
                  onClick={() => updateItem(item.item_id)}
                >
                  Update
                </button>
                        </td>
                        <td>
                        <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.item_id)}
                >
                  Delete
                </button>
                        </td>
                
                        </tr>
                    ))}

                    </tbody>

                
                </table>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Items;