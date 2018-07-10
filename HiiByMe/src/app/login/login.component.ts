import { Component, OnInit, ViewChild,NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";

import {AuthService} from "../services/auth.service";
import {Router,ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("f") signinform:NgForm;
  invalidlogin:boolean=false;
  loginfirst:boolean=false;
 
constructor(private service :AuthService,
  private router:Router,
  private route:ActivatedRoute

  ) {}


  ngOnInit() {
     let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
     if(returnUrl) this.loginfirst=true;
  }


UserSignin(){
  	

    let input:any=this.signinform.value;
   
       this.service.UserSignin(input)
       .subscribe(response=>{
         if(response){

           let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
           console.log(returnUrl);

           this.router.navigate([ returnUrl ||'/']);
         }
         else
           this.invalidlogin=true;


       });


  	}
  


}
