const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const authentication = require('../middleware')
const Post = require('../models/Post');
const User = require('../models/User');
var zipcodes = require('zipcodes');

router.use(authentication);



function zipcodeDistance(zipcode1, zipcode2) {
    return zipcodes.distance(Number(zipcode1), Number(zipcode2));
}
router.post("/", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        console.log(userId);
        const { time, price1, price2, distance1, distance2, gender, age1, age2, zipcode} = req.body;
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
        lists.sort((p1, p2) => {
            const result=zipcodeDistance(p1.dataValues.zipcode, zipcode) - zipcodeDistance(p2.dataValues.zipcode, zipcode);
            
            return result;
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