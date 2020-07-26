const express = require('express');
const router = express.Router();
const JWTKey = require('../verify-signature');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authentication = require('../middleware')
const db = require('../db');
const User = require('../models/User');
//middleware
router.use(authentication);

//get user list
router.get('/', (req, res) => 
    User.findAll()
        .then(users => {
            console.log(users);
            res.send(users);
        })
        .catch(err => console.log(err))
);




//log out
// app.delete('/logout', (req, res) => {
//     const authHeader = req.headers['authorization'];
//     // console.log(authHeader);
//     const token = authHeader && authHeader.split(' ')[1]
//     console.log(token);
//     if (token == null){
//         return res.sendStatus(401);""
//     }
//     token = undefined;
//     res.sendStatus(204);
// })

//update user info
router.put("/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        console.log('!！！test userid', id);
        const {name, age, gender} = req.body;
       
        console.log('!！！test name update', name);
        const edit = await User.update( 
            {name,age,gender}, 
            {where: {id}}
        );
        res.json(edit);
    }catch(err){
        console.error(err.message);
    }
})

//get user info
router.get("/myprofile", async(req, res)=>{
    try{
        const id = req.user.userId;
        const user = await User.findAll( {
            where: {
               id
            }
        });
        console.log('users info route', user);
        res.json(user);
        
    }catch(err){
        console.error(err.message);
    }
})

module.exports = router;