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


//sign up ok
app.post('/signup', async (req, res) => {
    const { username, password, gender, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
  
    const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
      [username]
    );
  
    if (exists.rowCount === 0) {
      const newUser = await pool.query("INSERT INTO user_list (email, password, gender, age) VALUES($1,$2,$3,$4)  RETURNING *",
        [username, hashedPassword, gender, age]
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

  //login ok
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

//delete user
app.delete("/deleteuser/:id",async(req, res)=>{
    try{
        const {id}=req.params;
        const deletedItem=await pool.query("DELETE FROM user_list WHERE user_id=$1 RETURNING *",
    [id]);
    res.json(deletedItem);
    }catch(err){
        console.error(err.message);
    }
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

//update user information ok
app.put("/updateuser", authenticateToken,async(req, res)=>{
    try{
        const  user_id  = req.user.userId;
        const {username, gender, age} = req.body;

    const newItem= await pool.query("UPDATE user_list SET email=$1, gender=$2, age=$3 WHERE user_id=$4 RETURNING *",
    [username, gender, age, user_id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
    } 
});

//Post table API
//add post ok
app.post("/createpost", authenticateToken,async(req, res)=>{
    try{
        const  user_id  = req.user.userId;
        const {time, price, zipcode} = req.body;

        const newItem= await pool.query("INSERT INTO post_list (creator_id, time, price, zipcode, done) VALUES($1, $2, $3,$4, False)  RETURNING *",
            [user_id, time, price, zipcode]
        );
        res.json(newItem);
    }catch(err){
        console.error(err.message);
    }
});

//get all other post ok
app.get("/posts/", authenticateToken, async(req, res)=>{
    try{
        // const { token } = req.headers;
        // var decoded = jwt.verify(token, JWTKey);
        // console.log(req.user);
        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE creator_id<>$1 AND done=false", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all self post
//authourization ok
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

//get all self done lists ok
app.get("/posts/done", authenticateToken, async(req, res)=>{
    try{

        const  user_id  = req.user.userId;
        const lists=await pool.query("SELECT * FROM post_list WHERE creator_id=$1 AND done=true", [user_id]);

        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all self progress lists ok
app.get("/posts/progress", authenticateToken, async(req, res)=>{
    try{
        // const { token } = req.headers;
        // var decoded = jwt.verify(token, JWTKey);
        // console.log(req.user);
        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE creator_id=$1 AND done=false", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//get all accept order ok
app.get("/accept", authenticateToken, async(req, res)=>{
    try{

        const  user_id  = req.user.userId;
        // console.log("auth" + user_id);
        const lists=await pool.query("SELECT * FROM post_list WHERE reciver_id=$1", [user_id]);
        // console.log(lists.rows);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
})

//update post ok
app.put("/updatepost/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {time, price, zipcode} = req.body;

    const newItem= await pool.query("UPDATE post_list SET time=$1, price=$2, zipcode=$3 WHERE post_id=$4 RETURNING *",
    [time, price, zipcode, id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
    } 
});

//update post to done ok
app.put("/updatedone/:id", async(req, res)=>{
    try{
        const {id} = req.params;

    const newItem= await pool.query("UPDATE post_list SET done=True WHERE post_id=$1 RETURNING *",
    [id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
}
})

//delete post  ok
app.delete("/deletepost/:id",async(req, res)=>{
    try{
        const {id}=req.params;
        const deletedItem=await pool.query("DELETE FROM post_list WHERE post_id=$1 RETURNING *",
    [id]);
    res.json(deletedItem);
    }catch(err){
        console.error(err.message);
    }
});

//accept order  ok
app.put("/acceptpost", authenticateToken, async(req, res)=>{
    try{
        const {post_id} = req.body;
        const  user_id  = req.user.userId;
        const newItem= await pool.query("UPDATE post_list SET reciver_id=$1 WHERE post_id=$2 RETURNING *",
        [user_id, post_id] );
    res.json(newItem);
    }catch(err){
    console.error(err.message);
    } 
});

//filter time  ok
app.get("/posts/time", async(req, res)=>{
    try{

        const  {time}  = req.body;
        const lists=await pool.query("SELECT * FROM post_list WHERE time=$1 AND done=$2", [time, false]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});

//filter price   ok
app.get("/posts/price", async(req, res)=>{
    try{

        const  {price}  = req.body;
        const lists=await pool.query("SELECT * FROM post_list WHERE price=$1 AND done=$2", [price, false]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});

//search zipcode  ok
app.get("/posts/zipcode", async(req, res)=>{
    try{

        const  {zipcode}  = req.body;
        const lists=await pool.query("SELECT * FROM post_list WHERE zipcode=$1 AND done=false", [zipcode]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});

//get all other users  ok
app.get("/users",authenticateToken, async(req, res)=>{
    try{

        const  user_id  = req.user.userId;
        const lists=await pool.query("SELECT email FROM user_list WHERE user_id<>$1", [user_id]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});


//search user   ok
app.get("/searchuser", async(req, res)=>{
    try{

        const  {username}  = req.body;
        const lists=await pool.query("SELECT email FROM user_list WHERE email=$1", [username]);
        res.json(lists.rows);
}catch(err){
    console.error(err.message);
}
});




app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});

