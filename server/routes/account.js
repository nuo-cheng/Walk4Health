
const express = require('express');
const router = express.Router();
const JWTKey = require('../verify-signature');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db');
const User = require('../models/User');

//sign up
router.post('/signup', async (req, res) => {
    const { email, password, age, gender, name} = req.body;
    console.log('password', password);
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
            age,
            name
        })
        console.log('user', user)
        const userId = user.dataValues.id;
        const token = jwt.sign({userId: userId, email: email, userName: name}, JWTKey)
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
        const token = jwt.sign({ userId: user.id, email: user.email, userName: user.name}, JWTKey);
        console.log(token);
        res.json({accessToken: token});
      } else {
          console.log("dosen't match");
        res.status(401).send('Either email or password not correct');
      }
    }
  })

  module.exports = router;