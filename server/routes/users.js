
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db');
const User = require('../models/User');

const JWTKey = "SOMESECRET";

//get user list
router.get('/', (req, res) => 
    User.findAll()
        .then(users => {
            console.log(users);
            res.send(users);
        })
        .catch(err => console.log(err))
);

// login

// signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existed = await User.findAll({
        where: {
            email
        }
    });

    console.log(existed)

    if (existed.length > 0) {
        res.status(409).send(`Email address ${email} already registerd`);
    } else {
        const user = await User.create({
            email: email,
            password: hashedPassword
        })
        console.log('user', user)
        const userId = user.dataValues.id;
        // const token = jwt.sign({userId: userId, email: email}, JWTKey)
         res.status(200).send();
        
    }

});
  //login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findAll({
      where: {
          email: email
      }
  });

  console.log(exist)
  if (exist.length === 0) {
    res.status(404).send('User not found');
  } else {
    const user = exist[0].dataValues;

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.user_id, username: user.username}, JWTKey);
    //   console.log(token);
      res.json({accessToken: token});
    } else {
        console.log("dosen't match");
      res.status(401).send('Either email or password not correct');
    }
  }
})
//   //login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
//     [username]
//   );
//   if (exists.rowCount === 0) {
//     res.status(404).send('User not found');
//   } else {
//     const user = exists.rows[0];
//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({ userId: user.user_id, username: user.username}, JWTKey);
//     //   console.log(token);
//       res.json({accessToken: token});
//     //   res.status(200).send(token);
//     } else {
//         console.log("dosen't match");
//       res.status(401).send('Either email or password not correct');
//     }
//   }
// })

// //sign up
// app.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10)
  
//     const exists = await pool.query("SELECT * FROM user_list WHERE email=$1",
//       [username]
//     );
  
//     if (exists.rowCount === 0) {
//       const newUser = await pool.query("INSERT INTO user_list (email, password) VALUES($1,$2)  RETURNING *",
//         [username, hashedPassword]
//       );
//       const userId = newUser.rows[0].user_id;
//       const user = {userId: userId, username: username};
//     //   const token = jwt.sign(user, JWTKey)
//     //   res.status(200).send(token);
  
//     } else {
//       res.status(409).send(`Email address ${username} already registerd`);
//     }
//     res.status(200).send(`${username}, ${hashedPassword}`)
//   })





// //create a todo
// app.post("/todos", async(req, res)=>{
//     try{
//         const {description, list_id} = req.body;
        
//         const newTodo= await pool.query("INSERT INTO todo (description, list_id) VALUES($1,$2)  RETURNING *",
//             [description, list_id]
//         );

//         res.json(newTodo);
//     }catch(err){
//         console.error(err.message);
//     }
// })

// //create a todo_list
// app.post("/createlist",async(req, res)=>{
//     try{
//         const {description, user_id} = req.body;
        
//         const newList= await pool.query("INSERT INTO todo_list (description, user_id) VALUES($1, $2)  RETURNING *",
//             [description, user_id]
//         );
//         res.json(newList);
//     }catch(err){
//         console.error(err.message);
//     }
// })

// //Create a TodoItem for a specific list
// app.post("/createitem", async(req, res)=>{
//     try{
//         const {list_id, description} = req.body;

//         const newItem= await pool.query("INSERT INTO todo_item (list_id, description, done) VALUES($1, $2, False)  RETURNING *",
//             [list_id, description]
//         );
//         res.json(newItem);
//     }catch(err){
//         console.error(err.message);
//     }
// })

// //Update a TodoItem and mark it as done
// app.put("/updateitem/:id", async(req, res)=>{
//     try{
//         const {id} = req.params;

//     const newItem= await pool.query("UPDATE todo_item SET done=True WHERE item_id=$1 RETURNING *",
//     [id] );
//     res.json(newItem);
//     }catch(err){
//     console.error(err.message);
// }
// })

// //Delete a TodoListItem
// app.delete("/deleteitem/:id",async(req, res)=>{
//     try{
//         const {id}=req.params;
//         const deletedItem=await pool.query("DELETE FROM todo_item WHERE item_id=$1 RETURNING *",
//     [id]);
//     res.json(deletedItem);
//     }catch(err){
//         console.error(err.message);
//     }
// })

// //Delete a TodoList
// app.delete("/deletelist/:id", async(req, res)=>{
//     try{
//         const {id}=req.params;
//         const deletedItems=await pool.query("DELETE FROM todo_item WHERE list_id=$1 RETURNING *", [id]);
//         const deletedList=await pool.query("DELETE FROM todo_list WHERE list_id=$1 RETURNING *",[id]);
//         res.json(deletedList);
//         res.json(deletedItems);
//     }catch(err){
//         console.error(err.message);
//     }
// })

// //authourization
// function authenticateToken(req, res,next){
//     const authHeader = req.headers['authorization'];
//     // console.log(authHeader);
//     const token = authHeader && authHeader.split(' ')[1]
//     // console.log(token);
//     if (token == null){
//         return res.sendStatus(401);""
//     }
//     jwt.verify(token, JWTKey, (err, user) => {
//         if (err){
//             return res.sendStatus(403)
//         }
//         req.user = user;
//         console.log(user.userId);
//         next()
//     }) 
// }

// //get all lists
// app.get("/lists", authenticateToken, async(req, res)=>{
//     try{
//         // const { token } = req.headers;
//         // var decoded = jwt.verify(token, JWTKey);
//         // console.log(req.user);
//         const  user_id  = req.user.userId;
//         // console.log("auth" + user_id);
//         const lists=await pool.query("SELECT * FROM todo_list WHERE user_id=$1", [user_id]);
//         // console.log(lists.rows);
//         res.json(lists.rows);
// }catch(err){
//     console.error(err.message);
// }
// })

// //get all items for a list
// app.get("/items/:id", async(req, res)=>{
//     try{
//         const {id}=req.params;
//         const items=await pool.query("SELECT * FROM todo_item WHERE list_id=$1 ", [id]);
//         res.json(items.rows);
// }catch(err){
//     console.error(err.message);
// }
// })

module.exports = router;