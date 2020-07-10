const express=require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


app.use(cors());
app.use(express.json());

//Routes

const JWTKey = "SOMESECRET";


//sign up
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
  
    const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
      [username]
    );
  
    if (exists.rowCount === 0) {
      const newUser = await pool.query("INSERT INTO user_list (email, password) VALUES($1,$2)  RETURNING *",
        [username, hashedPassword]
      );
      const userId = newUser.rows[0].user_id;
      const user = {userId: userId, username: username};
    //   const token = jwt.sign(user, JWTKey)
    //   res.status(200).send(token);
  
    } else {
      res.status(409).send(`Email address ${username} already registerd`);
    }
    res.status(200).send(`${username}, ${hashedPassword}`)
  })

  //login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
    [username]
  );
  if (exists.rowCount === 0) {
    res.status(404).send('User not found');
  } else {
    const user = exists.rows[0];
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.user_id, username: user.username}, JWTKey);
    //   console.log(token);
      res.json({accessToken: token});
    //   res.status(200).send(token);
    } else {
        console.log("dosen't match");
      res.status(401).send('Either email or password not correct');
    }
  }
})

//log out
app.delete('/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null){
        return res.sendStatus(401);""
    }
    token = undefined;
    res.sendStatus(204);
})


//create a todo
app.post("/todos", async(req, res)=>{
    try{
        const {description, list_id} = req.body;
        
        const newTodo= await pool.query("INSERT INTO todo (description, list_id) VALUES($1,$2)  RETURNING *",
            [description, list_id]
        );

        res.json(newTodo);
    }catch(err){
        console.error(err.message);
    }
})

//create a todo_list
app.post("/createlist",async(req, res)=>{
    try{
        const {description, user_id} = req.body;
        
        const newList= await pool.query("INSERT INTO todo_list (description, user_id) VALUES($1, $2)  RETURNING *",
            [description, user_id]
        );
        res.json(newList);
    }catch(err){
        console.error(err.message);
    }
})

//Create a TodoItem for a specific list
app.post("/createitem", async(req, res)=>{
    try{
        const {list_id, description} = req.body;

        const newItem= await pool.query("INSERT INTO todo_item (list_id, description, done) VALUES($1, $2, False)  RETURNING *",
            [list_id, description]
        );
        res.json(newItem);
    }catch(err){
        console.error(err.message);
    }
})

//Update a TodoItem and mark it as done
app.put("/updateitem/:id", async(req, res)=>{
    try{
        const {id} = req.params;

    const newItem= await pool.query("UPDATE todo_item SET done=True WHERE item_id=$1 RETURNING *",
    [id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
}
})

//Delete a TodoListItem
app.delete("/deleteitem/:id",async(req, res)=>{
    try{
        const {id}=req.params;
        const deletedItem=await pool.query("DELETE FROM todo_item WHERE item_id=$1 RETURNING *",
    [id]);
    res.json(deletedItem);
    }catch(err){
        console.error(err.message);
    }
})

//Delete a TodoList
app.delete("/deletelist/:id", async(req, res)=>{
    try{
        const {id}=req.params;
        const deletedItems=await pool.query("DELETE FROM todo_item WHERE list_id=$1 RETURNING *", [id]);
        const deletedList=await pool.query("DELETE FROM todo_list WHERE list_id=$1 RETURNING *",[id]);
        res.json(deletedList);
        res.json(deletedItems);
    }catch(err){
        console.error(err.message);
    }
})

//authourization
function authenticateToken(req, res,next){
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token);
    if (token == null){
        return res.sendStatus(401);""
    }
    jwt.verify(token, JWTKey, (err, user) => {
        if (err){
            return res.sendStatus(403)
        }
        req.user = user;
        console.log(user.userId);
        next()
    }) 
}

//get all lists
app.get("/lists", authenticateToken, async(req, res)=>{
    try{
        // const { token } = req.headers;
        // var decoded = jwt.verify(token, JWTKey);
        // console.log(req.user);
        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM todo_list WHERE user_id=$1", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all items for a list
app.get("/items/:id", async(req, res)=>{
    try{
        const {id}=req.params;
        const items=await pool.query("SELECT * FROM todo_item WHERE list_id=$1 ", [id]);
        res.json(items.rows);
}catch(err){
    console.error(err.message);
}
})










//User table API
//sign up
//login

//Post table API
//add post
app.post("/createpost", async(req, res)=>{
    try{
        const  user_id  = req.user.userId;
        const {time, price} = req.body;

        const newItem= await pool.query("INSERT INTO post_item (creator_id, time, price, done) VALUES($1, $2, $3, False)  RETURNING *",
            [user_id, time, price]
        );
        res.json(newItem);
    }catch(err){
        console.error(err.message);
    }
});

//get all other post
app.get("/posts/", authenticateToken, async(req, res)=>{
    try{
        // const { token } = req.headers;
        // var decoded = jwt.verify(token, JWTKey);
        // console.log(req.user);
        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE user_id<>$1 AND done=false", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all self post
//authourization
function authenticateToken(req, res,next){
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token);
    if (token == null){
        return res.sendStatus(401);""
    }
    jwt.verify(token, JWTKey, (err, user) => {
        if (err){
            return res.sendStatus(403)
        }
        req.user = user;
        console.log(user.userId);
        next()
    }) 
}

//get all self done lists
app.get("/posts/done", authenticateToken, async(req, res)=>{
    try{
        // const { token } = req.headers;
        // var decoded = jwt.verify(token, JWTKey);
        // console.log(req.user);
        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE user_id=$1 AND done=true", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all self progress lists
app.get("/posts/progress", authenticateToken, async(req, res)=>{
    try{
        // const { token } = req.headers;
        // var decoded = jwt.verify(token, JWTKey);
        // console.log(req.user);
        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE user_id=$1 AND done=false", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all accept order
app.get("/posts/progress", authenticateToken, async(req, res)=>{
    try{

        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE receiver_id=$1", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//update post
app.put("/updatepost/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {time, price} = req.body;

    const newItem= await pool.query("UPDATE post_item SET time=$1, price=$2 WHERE post_id=$3 RETURNING *",
    [time, price, id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
    } 
});

//update post to done
app.put("/updatedone/:id", async(req, res)=>{
    try{
        const {id} = req.params;

    const newItem= await pool.query("UPDATE todo_item SET done=True WHERE post_id=$1 RETURNING *",
    [id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
}
})

//delete post
app.delete("/deletepost/:id",async(req, res)=>{
    try{
        const {id}=req.params;
        const deletedItem=await pool.query("DELETE FROM post_item WHERE post_id=$1 RETURNING *",
    [id]);
    res.json(deletedItem);
    }catch(err){
        console.error(err.message);
    }
});

//accept order
app.put("/acceptpost/:id", authenticateToken, async(req, res)=>{
    try{
        const {post_id} = req.params;
        const  user_id  = req.user.userId;
        const newItem= await pool.query("UPDATE post_item SET reciver_id=$1 WHERE post_id=$2 RETURNING *",
        [user_id, post_id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
    } 
});

//filter time
app.get("/posts/time", async(req, res)=>{
    try{

        const  time  = req.body;
        const lists=await pool.query("SELECT * FROM post_list WHERE time=$1 AND done=false", [time]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});

//filter price
app.get("/posts/price", async(req, res)=>{
    try{

        const  price  = req.body;
        const lists=await pool.query("SELECT * FROM post_list WHERE time=$1 AND done=false", [price]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});

//search zipcode
app.get("/posts/zipcode", async(req, res)=>{
    try{

        const  zipcode  = req.body;
        const lists=await pool.query("SELECT * FROM post_list WHERE zipcode=$1 AND done=false", [zipcode]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});

//get all other users
app.get("/users",authenticateToken, async(req, res)=>{
    try{

        const  user_id  = req.user.userId;
        const lists=await pool.query("SELECT username FROM user_list WHERE username<>$1", [user_id]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});


//search user
app.get("/users/searchuser", async(req, res)=>{
    try{

        const  username  = req.body;
        const lists=await pool.query("SELECT username FROM user_list WHERE username=$1", [username]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});




app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});

