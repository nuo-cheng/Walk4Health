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



<<<<<<< HEAD
=======
    if (existed.length > 0) {
        res.status(409).send(`Email address ${email} already registerd`);
    } else {
        const user = await User.create({
            email: email,
            password: hashedPassword,
            gender,
            age
        })
        console.log('user', user)
        const userId = user.dataValues.id;
        const token = jwt.sign({userId: userId, email: email}, JWTKey)
        res.json({accessToken: token});
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
  

    if (exist.length === 0) {
      res.status(404).send('User not found');
    } else {
      const user = exist[0].dataValues;
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id, email: user.email}, JWTKey);
        console.log(token);
        res.json({accessToken: token});
      } else {
          console.log("dosen't match");
        res.status(401).send('Either email or password not correct');
      }
    }
  })
>>>>>>> ad28ed375d7755d7b01cc009bb7c72cdedcf1dbc

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

//update one specific field of user
router.put("/:id", async(req, res)=>{
    try{
        const {id} = req.params;

        const edit = await User.update( 
            {...req.body}, {
               where: {
                   id
               }
            }
        );
        res.json(edit);
    }catch(err){
        console.error(err.message);
    }
})

//get user info
router.get("/myprofile", async(req, res)=>{
    try{
        console.log(req.user);

        const id = req.user.userId;
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