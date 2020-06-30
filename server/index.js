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



app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)

  const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
    [email]
  );

  if (exists.rowCount === 0) {
    const newUser = await pool.query("INSERT INTO user_list (email, password) VALUES($1,$2)  RETURNING *",
      [email, hashedPassword]
    );
    const userId = newUser.rows[0].user_id;
    const token = jwt.sign({ userId: userId, email: email}, JWTKey)
    res.status(200).send(token);

  } else {
    res.status(409).send(`Email address ${email} already registerd`);
  }
  res.status(200).send(`${email}, ${hashedPassword}`)
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
    [email]
  );
  if (exists.rowCount === 0) {
    res.status(404).send('User not found');
  } else {
    const user = exists.rows[0];
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.user_id, email: user.email}, JWTKey);
      res.status(200).send(token);
    } else {
      res.status(401).send('Either email or password not correct');
    }
  }
})


 app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
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
        const {description} = req.body;
        
        const newList= await pool.query("INSERT INTO todo_list (description) VALUES($1)  RETURNING *",
            [description]
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

//get all lists
app.get("/lists", async(req, res)=>{
    try{
        const lists=await pool.query("SELECT * FROM todo_list");
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


app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});

