//authourization
const JWTKey = require('./verify-signature');
const jwt = require('jsonwebtoken');

const authentication = function authenticateToken(req, res,next){
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null){
        return res.sendStatus(401);""
    }
    jwt.verify(token, JWTKey, (err, user) => {
        if (err){
            console.log('err', err, JWTKey);
            return res.sendStatus(403)
        }
        req.user = user;
        next()
    }) 
}

module.exports = authentication; 
