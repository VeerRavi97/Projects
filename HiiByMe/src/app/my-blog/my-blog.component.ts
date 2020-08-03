import { Component, OnInit, ViewChild,NgModule,HostBinding} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import {ActivatedRoute} from "@angular/router";
import {fade,slide,routeslide,expandCollapse} from "../animations"




import {AuthService} from "../services/auth.service";
import {BlogService} from "../services/blog.service";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css'],
  animations: [fade,slide,routeslide,expandCollapse]
  
  
})
export class MyBlogComponent implements OnInit {

@HostBinding('@routeslide') routeAnimation=true;
@ViewChild("f") postData:NgForm;


    filename:string= "No file choosen...";
    isActive:boolean=false;
   isLogged:boolean=false;
  posts:any[]=[];
  now = moment().format('LLLL');
  todo:any;
  isLoaded:boolean=false;
  isOwned:boolean=false;
  popupmessage:boolean=false;
  date:any;
 diff:any;

 isExpanded:boolean;

selectedFile:File=null;

  constructor(private auth :AuthService,private service :BlogService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit() {

   this.isLogged=this.auth.isLoggedIn();
   

 console.log("is logged in",this.isLogged);


let username=this.auth.CurrentUser;
 console.log("owner is",username);
 console.log("currentuser is",this.auth.CurrentUser);
if(username===this.auth.CurrentUser)
     this.isOwned=true;


    console.log("is owned  ",this.isOwned);

   // console.log(username);
     this.spinner.show();
   this.route.paramMap
   .subscribe(params=>{
     this.service.getblog(username)

      .subscribe(res=>{
     
        this.posts = _.values(res.blogs);
       
       console.log(this.posts);
        
        this.isLoaded=true;
         this.spinner.hide();
   
      })

   });


   }


onUpload(event){


  this.selectedFile=event.target.files[0];
  this.filename=this.selectedFile.name;
  this.isActive=true;
  console.log(this.filename);
  console.log(this.selectedFile);

}





SubmitBlog(){
 // console.log(this.postData);


 let formData = new FormData();

formData.append('title',this.postData.value.title );
formData.append('description',this.postData.value.mytext );
formData.append('image',this.selectedFile,this.selectedFile.name );

console.log(formData.get('title'));
console.log(formData.get('description'));

console.log(formData.get('image'));



  
  this.service.createblog(formData)
  .subscribe(res=>{

   this.posts.unshift(res);
    
   this.filename="";
   console.log(this.posts);
    
  });
  
}




  // toggle(){

  //   this.isExpanded=!this.isExpanded;
  //   console.log(this.isExpanded);
  // }



  

}
