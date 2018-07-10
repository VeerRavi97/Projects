import { Component, OnInit, ViewChild,NgModule,HostBinding} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";

import { NgxSpinnerService } from 'ngx-spinner';
import {ActivatedRoute} from "@angular/router";
import {fade,routeslide} from "../animations";
import {DataService} from "../services/data.service"



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  animations: [fade,routeslide]
 
})
export class HomeComponent implements OnInit {

   @HostBinding('@routeslide') routeAnimation=true;
@ViewChild("f") postData:NgForm;


isSent:boolean=false;

  constructor( private service:DataService) { }

  ngOnInit() {

  
  }

SendMessage(){
 console.log(this.postData.value);


this.service.SendMessage(this.postData.value)

.subscribe(res=>{

   

	console.log(res);

	this.isSent=true;
})
  
}







  
}


