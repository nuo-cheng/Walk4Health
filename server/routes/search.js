// //search zipcode
// app.get("/posts/zipcode", async(req, res)=>{
//     try{

//         const  zipcode  = req.body;
//         const lists=await pool.query("SELECT * FROM post_list WHERE zipcode=$1 AND done=false", [zipcode]);
//         res.json(lists.rows);
// }catch(err){
//     console.error(err.message);
// }
// });

// //get all other users
// app.get("/users",authenticateToken, async(req, res)=>{
//     try{

//         const  user_id  = req.user.userId;
//         const lists=await pool.query("SELECT username FROM user_list WHERE username<>$1", [user_id]);
//         res.json(lists.rows);
// }catch(err){
//     console.error(err.message);
// }
// });


// //search user
// app.get("/users/searchuser", async(req, res)=>{
//     try{

//         const  username  = req.body;
//         const lists=await pool.query("SELECT username FROM user_list WHERE username=$1", [username]);
//         res.json(lists.rows);
// }catch(err){
//     console.error(err.message);
// }
// });