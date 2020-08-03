const express=require('express');
const app=express();
const mongoose=require('mongoose');

const passport=require('passport');

const session=require("express-session");
const flash = require('connect-flash');
const methodOverride=require('method-override');
const bodyParser=require('body-parser');
 const URLSlugs = require('mongoose-url-slugs');
 const moment = require('moment');
 const config=require('./config/config.js');
 

//================PATHS,TEMPLATES and DATABASE=============//

const port=process.env.PORT||3000;
mongoose.connect('mongodb://localhost/blog_post')
.then(()=>console.log("connected to MongoDB...."))
.catch(err=>console.log('Could Not connect to MongoDB',err));
 
const path=require('path');




app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/dist/MyApp'));
app.use(methodOverride("_method"));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});







//==================REQUIRE MODELS ================//


var Post=require('./models/post.js');
var Comment=require('./models/comment.js');
var User=require('./models/user.js');
var Todo=require('./models/todo.js');
var Message=require('./models/form.js');
var Like=require('./models/like.js');






//===============REQUIRE ROUTES===============//



var indexRoutes= require("./routes/index");
var  blogRoutes = require("./routes/blog");
var  commentRoutes = require("./routes/comment");
var  todoRoutes = require("./routes/todo");




//=======BE CAREFUL OF ORDERNESS ===========//


app.use(function(req, res, next){
  
   res.locals.time=moment().format("Do MMM YYYY");
   next();
});




//=================USE ROUTES==================//


app.use( indexRoutes);
app.use(blogRoutes);
app.use(commentRoutes);
app.use(todoRoutes);



app.get("*",(req,res)=>res.sendFile(__dirname+'/dist/MyApp/index.html'));





app.listen(port,()=>{
	console.log(`server started at ${port} `);
});