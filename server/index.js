const express=require("express");
const app=express();
const cors=require("cors");

//Database 
const db = require('./db');

//test DB
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

app.use(cors());
app.use(express.json());

// app.use(authentication);

//Routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/search', require('./routes/search'));
// app.use('/filter', require('./routes/filter'));

app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});

