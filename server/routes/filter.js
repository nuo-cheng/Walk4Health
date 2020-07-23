const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const authentication = require('../middleware')
const Post = require('../models/Post');
const User = require('../models/User');

router.use(authentication);

// //filter time
// app.get("/posts/time", async(req, res)=>{
//     try{

//         const  time  = req.body;
//         const lists=await pool.query("SELECT * FROM post_list WHERE time=$1 AND done=false", [time]);
//         res.json(lists.rows);
// }catch(err){
//     console.error(err.message);
// }
// });

// //filter price
// app.get("/posts/price", async(req, res)=>{
//     try{

//         const  price  = req.body;
//         const lists=await pool.query("SELECT * FROM post_list WHERE time=$1 AND done=false", [price]);
//         res.json(lists.rows);
// }catch(err){
//     console.error(err.message);
// }
// });

//filter
router.get("/", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        console.log(userId);
        const { time, price1, price2, distance1, distance2, gender, age1, age2} = req.body;
        const lists = await Post.findAll( {
            where: {
                done: false, 
                [Op.not]: [
                    {creator_id: userId}
                ],
                [Op.and]: [
                    {time: time},
                    {price: {
                        [Op.between]: [price1, price2]
                    }},
                    {distance: {
                        [Op.between]: [distance1, distance2]
                    }}
                ]
            },
            include: [{
                model: User,
                as: 'user',
                where: {
                    [Op.and]: [
                        {age: {
                            [Op.between]: [age1, age2]
                        }},
                        {gender: gender}
                    ]
                },
                required: true
            }]
            
        });
        res.json(lists);
    }catch(err){
        console.log(err);
        console.error(err.message);
    }
})


//filter gender of posts creator
router.get("/gender", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const { gender, age1, age2 } = req.body;
        console.log(gender);
        const lists = await Post.findAll( {
            where: {},
            include: [{
                model: User,
                as: 'user',
                where: {[Op.and]: [
                    {age: {
                        [Op.between]: [age1, age2]
                    }},
                    {gender: gender}
                ]},
                required: true
            }]
        });
        console.log(lists);
        res.json(lists);
    }catch(err){
        console.error(err.message);
    }
})

module.exports = router;