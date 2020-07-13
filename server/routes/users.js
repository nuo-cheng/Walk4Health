const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db');
const User = require('../models/User');

const JWTKey = "SOMESECRETS";

//get user list
router.get('/', (req, res) => 
    User.findAll()
        .then(users => {
            console.log(users);
            res.send(users);
        })
        .catch(err => console.log(err))
);


//sign up
router.post('/signup', async (req, res) => {
    const { email, password, age, gender } = req.body;
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
            password: hashedPassword,
            gender,
            age
        })
        console.log('user', user)
        //const userId = user.dataValues.id;
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

module.exports = router;