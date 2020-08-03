import { Component, OnInit, ViewChild,NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";

import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


@ViewChild("f") signupform:NgForm;


 invalidregister:boolean=false;
 
constructor(private service :AuthService) {}


   successmessage:any;
   errormessage:any;
   issuccess:any=false;
   iserror:any=false;

  ngOnInit() {}
 
  
  UserRegister(){
  	
    // let input:any={

    // 	username :this.signupform.value.username
    // 	password :this.signupform.value.password,
    // 	email:this.signupform.value.email

    // }

    let input:any=this.signupform.value;
console.log(input);
       this.service.UserRegister(input)
       .subscribe(res=>{
        if(res.success)
{

  this.successmessage=res.message;
  console.log(this.successmessage);
  this.issuccess=true;
}
else{
this.errormessage=res.message;
  console.log(this.errormessage);
  this.iserror=true;

}


       });
        


  	}
  
   
   
}
