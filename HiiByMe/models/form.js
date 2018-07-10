const mongoose=require('mongoose');
const Schema=mongoose.Schema;
 

const MessageSchema=new Schema({
  name:{
    type:String,
    required:true
  },
 

  email:{
  	type:String,
    required:true
  },

  created:{
  	type:Date,
  	defaut:Date.now()
  },

   message:{
    type:String,
    required:true
  }
  
  

});

var Message=mongoose.model("Message",MessageSchema);
module.exports=Message;
