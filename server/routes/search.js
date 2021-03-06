const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const authentication = require('../middleware')
const Post = require('../models/Post');
var zipcodes = require('zipcodes');

router.use(authentication);

//search posts sorted by zipcode distance
//helper
function zipcodeDistance(zipcode1, zipcode2) {
    return zipcodes.distance(Number(zipcode1), Number(zipcode2));
}


router.get("/byzipcode/:zipcode", async(req, res)=>{
    try{
        // console.log(req.user);
        const { zipcode }  = req.params;
        console.log(zipcode);
        const lists = await Post.findAll( {
            where: {
                done: false,
                receiver_id: null,
                [Op.not]: [
                    {creator_id: req.user.userId}
                ]
            }
        });
    
        lists.sort((p1, p2) => {
            const result=zipcodeDistance(p1.dataValues.zipcode, zipcode) - zipcodeDistance(p2.dataValues.zipcode, zipcode);
            
            return result;
        });
        
        res.json(lists);
       

    }catch(err){
        console.error(err.message);
    }
})



module.exports = router;