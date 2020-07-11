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
    
    const { userId }  = req.user;
    console.log('userId', userId)
    const { price, distance, time, zipcode,reciever_id } = req.body;
    try {
        const post = await Post.create({
            price,
            distance,
            time,
            zipcode,
            creator_id: userId,
            reciever_id,
            done: false
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

module.exports = router;