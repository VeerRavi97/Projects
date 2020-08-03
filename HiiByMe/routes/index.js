
var express = require("express");
var router  = express.Router();
var User=require('../models/user.js');
var Message=require('../models/form.js');
const auth=require('../middleware/auth');


const passport=require('passport');
var bcrypt = require('bcrypt');
const _=require('lodash');
const config=require('../config/config.js');
const jwt=require('jsonwebtoken');




//=====================REGISTER=====================//

router.post("/register", function(req, res){


      let username=req.body.username;
      let email=req.body.email;
      let password=req.body.password;
      console.log('got request');
      console.log(req.body);

      User.find({email}).then(newmail=>{

        if(!(_.isEmpty(newmail))){
            console.log('email already exists');
            console.log(newmail);
          res.json({
          success:false,
           message:'Email already exists'

         });
        }

       else

        {

      

            User.findOne({username}).then(newusername=>{

            if(newusername)
           {
        
           res.json({
           success:false,
           message:'Username already taken'

                 });
           }
        else
        {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
           const newuser=new User({

           username:username,
            email:email,
           password:hash

           });

       newuser.save().then((Datasaved)=>{

         res.status(200).json({
         success:true,
          message:'You have successfully registered'

           });
        }).catch((error)=>{
           console.log(error);
            res.status(404).json(error);

         });

        }
      });
          }



  }).catch((error)=>{
           console.log(error);
            res.status(404).json(error);

         });
        }
      
     });
});

//==============FORM SUBMIT=================//

router.post("/api/message",(req,res)=>{


  console.log("message request");


  let name=req.body.name;
  let email=req.body.email;
  let message=req.body.message;
  console.log(req.body);

var newmessage=new Message(
      {
        name:name,
     
       email:email,
  
       message:message
   });
    
newmessage.save().then((Datasaved)=>{
  console.log(Datasaved);

    res.status(200).json(newmessage);
}).catch((error)=>{
    console.log(error);
    res.status(404).json(error);
});
    
    
});

//=====================LOGIN======================//


router.post("/login", (req, res) => {


  console.log(req.body);
  User.findOne({ username: req.body.username })
    .then(user => {
     
      if (!user) {
          res.json({
            success:false,
          message: "Authentication failed,User not found"
        });
      }
    else {
       console.log(user);
      bcrypt.compare( req.body.password, user.password,(err, result) => {
        if (err) {
           res.status(401).json({
            message: "Auth failed"
          });
        }
        console.log(result);
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
              id: user._id,
              isAdmin:user.isAdmin
            },
            config.secret,
            {
                expiresIn: "3h"
            }
          );
          res.status(200).json({
            message: "Token Created",
            token: token
          });
        }
        else{
        res.json({
          success:false,
          message:"Authentication failed,Wrong password"
        });
        }
      });
    }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});















module.exports = router;