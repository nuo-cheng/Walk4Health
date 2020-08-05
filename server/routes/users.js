const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authentication = require('../middleware')
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

//update user info of one specific field
router.put("/specificupdate/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const edit = await User.update( 
            {...req.body}, 
            {where: {id}}
        );
        res.json(edit);
    }catch(err){
        console.error(err.message);
    }
})

//change password

router.put("/changepassword/:id", async(req, res)=>{
    const {password} = req.body; 
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const {id} = req.params;
        const change = await User.update( 
            {password: hashedPassword}, 
            {where: {id}}
        );
        res.json(change);
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

//get one user
router.get("/:id", async(req, res)=>{
    try{
        const id = req.params;
        const user = await User.findAll( {
            where: {
               id
            }
        });
        res.json(user);
        
    }catch(err){
        console.error(err.message);
    }
})

module.exports = router;