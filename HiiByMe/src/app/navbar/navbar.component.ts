import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 username:any="";
 status: boolean = false;
 

  constructor(  public auth :AuthService) {
  	
  	console.log("username is",this.username);
  }


  ngOnInit() {
  	
  }

clickevent(){

 this.status = !this.status;     
}



}
