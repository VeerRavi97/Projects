const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommentSchema=new Schema({

  text:{
  	type:String,
  	required:true
  },

    author:{

       username:String,
       id:
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'

  }
 
  },

  created:{
  	// type:Date,
  	// defaut:Date.now()
  }
  

});
var Comment=mongoose.model("Comment",CommentSchema);
module.exports=Comment;