const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema=mongoose.Schema;
var bcrypt = require('bcrypt');


const UserSchema=new Schema({

  username:{
  	type:String
  	// required:true
  },
 email:{
    type:String,
    required:true,
  unique:true
    
  },
  todos:[
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'Todo'

  }],
  blogs:[
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'Post'

  }],



   password:{
    type:String
    // required:true
  },

  isAdmin:{
    type:Boolean,
    default:false
    // required:true
  },

});

var User=mongoose.model("User",UserSchema);
module.exports=User;