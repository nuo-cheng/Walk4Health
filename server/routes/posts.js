const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const authentication = require('../middleware')
const Post = require('../models/Post');
//middleware
router.use(authentication);
//Post table API

//add post
router.post("/", async(req, res)=>{
    
    const  userId   = req.user.userId;
    const creator_name = req.user.userName;
    console.log('userId', userId)
    console.log('username int add: ' + creator_name);
    const { price, distance, time, zipcode,receiver_id } = req.body;
    try {
        const post = await Post.create({
            price,
            distance,
            time,
            zipcode,
            creator_id: userId,
            receiver_id,
            done: false,
            rating: null,
            creator_name: creator_name
        });
        console.log('post', post);

    }catch(err){
        console.error(err.message);
    }
    res.status(200).send();

});


//get all other post
router.get("/", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        console.log(userId);
        const lists = await Post.findAll( {
            where: {
                done: false,
                [Op.not]: [
                    {creator_id: userId}
                ]
            }
        });
        res.json(lists);
    }catch(err){
        console.log(err);
        console.error(err.message);
    }
})

// //get all self done lists
router.get("/mycompletedposts", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const lists = await Post.findAll( {
            where: {
                done: true,
                creator_id: userId
                
            }
        });
        console.log(lists);
        res.json(lists);
    }catch(err){
        console.error(err.message);
    }
})

//get all self progress lists
router.get("/myinprogressposts", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const lists = await Post.findAll( {
            where: {
                done: false,
                creator_id: userId
                
            }
        });
        console.log(lists);
        res.json(lists);
    }catch(err){
        console.error(err.message);
    }
})

//get all rated orders
router.get("/ratings", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const lists = await Post.findAll( {
            where: {
                [Op.not]: [
                    {rating: null}
                ],
                receiver_id: userId
            }
        });
        console.log(lists);
        var total = 0;
        for(var i = 0; i < lists.length; i++) {
            total += lists[i].dataValues.rating;
        };
        var average = total / lists.length;
        var votes = lists.length;
        let data = [average, votes]
        console.log('rating data', data);
        res.json(data);
    }catch(err){
        console.error(err.message);
    }
})

//get all accept order
router.get("/", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const lists = await Post.findAll( {
            where: {
                [Op.not]: [
                    {receiver_id: null}
                ]
            }
        });
        console.log(lists);
        res.json(lists);
    }catch(err){
        console.error(err.message);
    }
})

//get all created order
router.get("/created", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const lists = await Post.findAll( {
            where: {
                creator_id: userId
            }
        });
        console.log(lists);
        res.json(lists);
    }catch(err){
        console.error(err.message);
    }
})

//get all accepted order
router.get("/accepted", async(req, res)=>{
    try{
        // console.log(req.user);
        const  userId  = req.user.userId;
        const lists = await Post.findAll( {
            where: {
                receiver_id: userId
            }
        });
        console.log(lists);
        res.json(lists);
    }catch(err){
        console.error(err.message);
    }
})

//accept order
router.put("/acceptorder", async(req, res)=>{
    try{
        // console.log(req.user);
        const { post_id } = req.body;
        const userId  = req.user.userId;
        const userName = req.user.userName;
        console.log("user in the accept order: "+ req.user.userName);
        const edit = await Post.update( 
            {receiver_id: userId,
            receiver_name: userName},{
            where: {
                id: post_id
            }
        });
        console.log(edit);
        res.json(edit);
    }catch(err){
        console.error(err.message);
    }
})

//order update done
router.put("/:id/done", async(req, res)=>{
    try{
        const {id} = req.params;

        const edit = await Post.update( 
            {done: 1}, {
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

//update one specific field of post
router.put("/:id", async(req, res)=>{
    try{
        const {id} = req.params;

        const edit = await Post.update( 
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

//get a specific self post
router.get("/:id", async(req, res)=>{
    try{
        // console.log(req.user);
        const  {id}  = req.params;
        const post = await Post.findAll( {
            where: {
                id
            }
        });
        res.json(post[0].dataValues);
        console.log(post[0].dataValues);
    }catch(err){
        console.error(err.message);
    }
})


// delete post
router.delete("/:id",async(req, res)=>{
    try{
        const {id}=req.params;
        const deletedItem=await Post.destroy({
            where: {
                id
            }
        })
    res.json(deletedItem);
    }catch(err){
        console.error(err.message);
    }
});

//give review
router.put("/:id/review", async(req, res)=>{
    try{
        const {id} = req.params;
        const { rating } = req.body;

        const edit = await Post.update( 
            {rating: rating}, {
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

module.exports = router;