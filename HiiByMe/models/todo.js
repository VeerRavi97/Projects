var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        
       
    },
    fromnow:{

    },

    views:{
      type:Number,
     
    },
    
    author:{

       username:String,
       id:
  {
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'

  }
}
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;