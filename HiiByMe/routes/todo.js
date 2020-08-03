const express = require("express");
const router  = express.Router();
var Todo=require('../models/todo.js');
var User=require('../models/user.js');
const _=require('lodash');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');




var moment = require('moment');





router.get("/api/todos",[auth,admin],(req,res)=>{
  
 
  // console.log('got request');
User.find({}).populate('todos')
.then(results=>{
console.log(results);

  res.json(results);
  
  })
  .catch(err=>{
  	res.send("error");
  });
  console.log('request sent');
});


router.delete("/api/todos/:id",auth,(req,res)=>{
  console.log("Delete request");
// console.log(req.params);
let id=req.params.id;

  Todo.findOne({_id:id}).then(todo=>{

   let loggedinuser=req.user.id;
   console.log(todo);
    let owner=todo.author.id;
    console.log("logged in user",loggedinuser);
    console.log("owner is",owner);

   if(loggedinuser==owner)

    {
    Todo.remove({_id:id}).then(result=>{
 
   res.json({
     success:true,
     message:"Successfully deleted"

   });
  }).catch(err=>{
  res.json(err);
  });
  }
  else{

    res.json({
     "success":false,
     "message": "Access Denied"

    });
  }

   

});



});




router.get("/api/todos/:username",(req,res)=>{
  console.log('got request');
console.log(req.params);
 let username=req.params.username;


User.findOne({username:username})

.populate('todos').then(result=>{

       console.log(result);
      

     result.todos.forEach(ans=>{

       console.log("ans is",ans);
       ans.views=ans.views+1;
       ans.save();
      
     });

   result.save()
   .then(result2=>{

    console.log("result2 is ",result2);
  res.json(result2);

   });



   

}).catch(err=>{
  res.send(err);
});
});





router.post("/api/todos",auth,(req,res)=>{
  console.log('got request');
// console.log(req.body);
// console.log(req.user.id);
let id=req.user.id;

  let name=req.body.newtodo;
  User.findOne({_id:id}).populate('todos').then(founduser=>{
  
  let date1=moment().format("hh:mm a");
  let date2= moment().format("YYYY-MM-DD HH:mm:ss"); 

  var author={
   username:req.user.username,
   id:req.user.id
  }
     

var newTodo=new Todo(
      {
        name:name,
       created:date1,
       author:author,
       fromnow:date2,
       views:0
   });
// console.log(newTodo);
founduser.todos.unshift(newTodo);

	
founduser.save().then((usersaved)=>{

 newTodo.save().then(savedTodo=>{
  console.log("savedTodo",savedTodo);
     res.json(savedTodo);


}).catch((error)=>{
	
	res.status(404).send(error);
});
	
	
});
});

});

router.put("/api/todos/:id",auth,(req,res)=>{

// console.log('update request');
// console.log(req.body);
let isDone=req.body.completed;
let id=req.params.id;
Todo.findOne({_id:id}).then(todo=>{

   let loggedinuser=req.user.id;
   console.log(todo);
    let owner=todo.author.id;
    console.log("logged in user",loggedinuser);
    console.log("owner is",owner);

   if(loggedinuser==owner)

    {
      console.log("equal hai");
    todo.completed=isDone;
   
   todo.save().then(Dataupdated=>{
    console.log(Dataupdated);
    res.json(Dataupdated);
  
  
}).catch(err=>{
  res.send("error");
});

  }
  else{

    res.json({
     "success":false,
     "message": "Access Denied"

    });
  }

   

});
});









module.exports=router;