
const express = require("express");
const router  = express.Router();
var Post=require('../models/post.js');
var Comment=require('../models/comment.js');
var Like=require('../models/like.js');
var User=require('../models/user.js');
var moment = require('moment');
const _=require('lodash');

const auth=require('../middleware/auth');
const admin=require('../middleware/admin');

const multer = require('multer');
  const DIR = '../MyApp/src/assets/uploads';

  const path=require('path');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
       // console.log("file is",file);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname  + moment().format("DDMMYYYYhmms") + path.extname(file.originalname));
      // console.log("filename is",file);
    }
});
const upload = multer({storage: storage});



 


//===================SHOW POSTS IN BLOG=================//







router.get("/blog",[auth,admin],(req,res)=>{

console.log("got request");
 const perPage = 10;
    const page = req.query.page || 1;

Post.find({}).sort({created:-1})
 .skip((perPage * page) - perPage)
  .limit(perPage)


.then(results=>{
     console.log(results);
    console.log(req.user);

     Post.count().then(postCount=>{

    res.json({
        results:results,
       currentuser:req.user,
       current: parseInt(page),
       pages: Math.ceil(postCount / perPage)
    });

  });
  })
  .catch(err=>{
    res.json({
      "success" :false,
  "message" : "Error Occured"

    });
  });

});








// ==========SUBMIT THE POST FORM =================//


router.post("/api/blogs",auth,upload.single('image'),(req,res)=>{



console.log("post request");
let id=req.user.id;

  // console.log(req.file);
  let title=req.body.title;
  let description=req.body.description;
  
 // console.log("description is ",description);

   User.findOne({_id:id}).populate('blogs').then(founduser=>{


    // console.log(founduser);
  var author={
   username:req.user.username,
   id:req.user._id
  }
     let filename=req.file.filename;
     let calender1=moment().format("dddd, DD MMMM YYYY, h:mm:ss a");
     let calender2=moment().format(" DD MMMM YYYY");

     let slug=slugify(title)+"_"+ "by"+req.user.username;

      console.log("slug is ",slug);

var newpost=new Post(
      {
        file:filename,
       description:description,
         author:author,
         title:title,

       created1:calender1,
       created2:calender2,
       slug:slug,
       views:0,
       nolikes:0


       
   });
// console.log(newpost);
founduser.blogs.unshift(newpost);

founduser.save().then((usersaved)=>{
  // console.log(usersaved);



	
newpost.save().then((Datasaved)=>{
console.log("savedBlog is",Datasaved);
     res.json(Datasaved);
}).catch((error)=>{
	console.log(error);
	res.status(404).send("Not posted");
});
});
	
	 });
});





//================INDIVISUAL POST SHOWPAGE =================//


router.get("/blog/:slug",(req,res)=>{
  console.log('got request');
console.log(req.params);
 let slug=req.params.slug;

 console.log("slug is",slug);
 console.log(typeof(slug));

Post.findOne({slug:slug})

.populate('comments')
.populate('likes')

.then(result=>{

       
    
        result.views=result.views+1;
        result.save().then(result2=>{

          console.log(result2);
       res.json(result2);

        });
        
    
     
   

	 

}).catch(err=>{
	res.send(err);
});
});











//==============USER BLOG================//

router.get("/api/blogs/:username",(req,res)=>{
  console.log('got request');
console.log(req.params);
 let username=req.params.username;


User.findOne({username:username})
.select({blogs:1})

.populate('blogs').then(result=>{

       console.log(result);
      


  res.json(result);

   

}).catch(err=>{
  res.send(err);
});
});




//=====================UPDATE POST ===============//


router.put("/api/blog/:id",auth,(req,res)=>{

  console.log("update request");
  console.log("request is",req.body);

   let id=req.params.id;

 
 Post.findOne({_id:id}).populate('likes').
 then(post=>{

     
      let loggedinuser=req.user.username;
     console.log(post);

    let owner=post.author.username;
   
      if(req.body.newblog){

       if(loggedinuser==owner){
        console.log("logged in user",loggedinuser);
        console.log("owner is",owner);
        post.description=req.body.newblog;
       console.log("new  description is",post.description);
        post.save().then(Dataupdated=>{
        console.log(Dataupdated);
         res.json(Dataupdated);
         }).catch(err=>{
        res.json("error");
       });


      }
      else{

    res.json({
     "success":false,
     "message": "Access Denied"

    });
    }

    }

      else if(req.body.likes)
      {
        let number=post.nolikes+1;
        console.log("number is",number);

         var author={
            username:req.user.username,
            id:req.user.id
           }
            let calender=moment().format("DD MMMM YYYY, h:mm:ss a");
         
        const newLike = new Like({

            nth:number,
              
            author:author,
            created: calender

        });


         post.likes.push(newLike);
         post.nolikes+=1;
      

      post.save().then(Dataupdated=>{

       newLike.save().then(savedLike=>{


        console.log(savedLike);
      res.json(savedLike);
      });

      }).catch(err=>{
       res.json("error");
     });

       

      }


      

   

});


});

//===================DELETE POST ===================//



router.delete("/api/blogs/:id",auth,(req,res)=>{


console.log("Delete request");
// console.log(req.params);
let id=req.params.id;

  Post.findOne({_id:id}).then(post=>{

   let loggedinuser=req.user.username;
   console.log(post);
    let owner=post.author.username;
    console.log("logged in user",loggedinuser);
    console.log("owner is",owner);

   if(loggedinuser==owner)

    {
    Post.remove({_id:id}).then(result=>{
    
      console.log("deleted");
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






//=====================LEAVE COMMENT===================//


router.post("/api/comment/:id",auth,(req, res)=>{

  console.log("comment request");
  let id=req.params.id;

  Post.findOne({_id:id}).populate('comments')

   .populate('likes')
  .then(post=>{

        console.log(req.user);
         let calender=moment().format("DD MMMM YYYY, h:mm:ss a");

           var author={
            username:req.user.username,
            id:req.user.id
           }
           console.log(author.username);
         
        const newComment = new Comment({

            
            text: req.body.comment,
            author:author,
            created: calender

        });
          console.log('New comment');
      console.log(newComment);

        post.comments.push(newComment);

            console.log('post with comment');
        console.log(post);

        post.save().then(savedPost=>{

            newComment.save().then(savedComment=>{

          

                res.json(savedComment);
            });
        });
    });
});











//=================MIDDLEWARES===================//





function slugify(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  }
  




module.exports=router;