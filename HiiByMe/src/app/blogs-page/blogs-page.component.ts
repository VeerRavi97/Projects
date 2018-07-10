import { Component, OnInit,HostBinding} from '@angular/core';

import {BlogService} from "../services/blog.service";
import { NgModule } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {fade,slide,routeslide} from "../animations";
import {DataService} from "../services/data.service";
import {AuthService} from "../services/auth.service";





@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css'],

})
export class BlogsPageComponent implements OnInit {
  // @HostBinding('@routeslide') routeAnimation=true;


title:any;

isLoaded:boolean=false;

 username:string="";

    products:any[];


  constructor(private service :BlogService,
    private spinner: NgxSpinnerService,
    private share: DataService,
     public auth: AuthService
    

    ) {}

  ngOnInit() {
   this.spinner.show();
   
     


      
  	 this.service.getBlogs()
 
   .subscribe(response=>{
  
  console.log(response);
    this.products=response.results;
  
    
    console.log(this.products);
   
     this.isLoaded=true;
         this.spinner.hide();
    
   });

  
   
       
   
  
  }



 

      









 



}



