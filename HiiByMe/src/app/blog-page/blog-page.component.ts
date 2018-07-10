import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {BlogService} from "../services/blog.service";
import {AuthService} from "../services/auth.service";
import {DataService} from "../services/data.service";

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {


 

isLoaded:boolean=false;

 
  comments:any[]=[];
  owner:any;
  
  blog:any;
  blogs:any[]=[];

 
 isLogged:boolean=false;

 isOwned:boolean=false;

isedited:boolean=false;
ischanged:boolean=false;
isLiked:boolean=false;


  constructor(private route:ActivatedRoute,
    private auth:AuthService,
    private service :BlogService,
    private spinner: NgxSpinnerService,
    private router:Router,
    public share:DataService
     ) {}

  ngOnInit() {

      let slug=this.route.snapshot.params['slug'];
  

     console.log(slug);
     

 console.log("currentuser is",this.auth.CurrentUser);





     this.spinner.show();
   this.route.paramMap
   .subscribe(params=>{
     this.service.getBlog(slug)

      .subscribe(res=>{
      
      	this.blog=res;
        console.log(this.blog);
        if(this.blog){

         this.owner= this.blog.author.username;
      	
         console.log("owner is",this.owner);
      	
      	this.isLoaded=true;
        if(this.owner==this.auth.CurrentUser)
        this.isOwned=true;
        console.log(this.isOwned);

        }
      	 this.spinner.hide();
   
      });

   });




  }








 remove(blog){
    console.log("to be deleted",blog.title);
      if(this.isOwned){
    let id=blog._id;
    console.log(id);
  this.service.removeBlog(id)
  .subscribe(res=>{

    let index=this.blogs.indexOf(blog);
    this.blogs.splice(index,1);

    this.router.navigate(['/blogs']);

   console.log(res);
  
  });

   }

  
  }


  edit(val,blog){

    let id=blog._id;;
    let newblog=val;
  console.log(id);
   console.log("val is",val);

    let Updateddata= {
      id:id,
     newblog: newblog}

console.log(Updateddata);
this.service.UpdateBlog(Updateddata)
  .subscribe(res=>{

   console.log(res);
    blog.description=newblog;
    blog.slug=res.slug;
    
     this.ischanged=true;
   this.isedited=false;

  });



}

 
 
      
     

    



doedit(){

  this.isedited=true;
 

    

}

onLiked(blog){


    let Updateddata= {
      id:blog._id,
      likes: "likes"
     }

  this.service.Liked(Updateddata)
  .subscribe(res=>{
      blog.likes.push(res);
      blog.nolikes+=1;
     this.isLiked=true;
    
  })


}




onComment(e,blog){

   let id=blog._id;;
    let comment=e.value;
     e.value=" ";
  

    let newComment= {
      id:id,
     comment: comment}

console.log(newComment);
this.service.Commented(newComment)
  .subscribe(res=>{
    blog.comments.push(res);
   
  });

}







}
