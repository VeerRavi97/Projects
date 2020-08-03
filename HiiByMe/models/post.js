const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var moment = require('moment'); 
 




const PostSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  slug:{
    type:String
  },
  

  file:{
  	type:String
  },

 description:{
  	type:String,
  	required:true
  },
  created1:{
  	// type:Date,
  	// defaut:Date.now()
  },
  created2:{
    // type:Date,
    // defaut:Date.now()
  },
  
  comments:[
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'Comment'

  }],
  author:{
  id:
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'

  },
  username:String
  },


  likes:[
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'Like'

  }],
  author:{
  id:
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'

  },
  username:String
  },







   views:Number,
   nolikes:Number
  
  
  

});


  

  




var Post=mongoose.model("Post",PostSchema);



  

module.exports=Post;
