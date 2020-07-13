const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const authentication = require('../middleware')
const Post = require('../models/Post');

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

module.exports = router;