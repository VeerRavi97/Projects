const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LikeSchema=new Schema({

    nth:{
    type: Number
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
var Like=mongoose.model("Like",LikeSchema);
module.exports=Like;