import { Component, OnInit, ViewChild,NgModule,HostBinding} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {fade,slide,routeslide,expandCollapse} from "../animations"

import {AuthService} from "../services/auth.service";
import {TodoService} from "../services/todo.service";
import * as moment from 'moment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
    animations: [fade,slide,routeslide,expandCollapse]

})
export class TodosComponent implements OnInit {

@HostBinding('@routeslide') routeAnimation=true;
isLogged:boolean=false;
 todos:any[]=[];
 users:any;
  constructor(private auth :AuthService,private service :TodoService) { }

  ngOnInit() {

  

   

 this.service.getTodos()
 .subscribe(res=>{

 this.users=res;
 this.users.forEach(user=>{

 	
 	user.todos.forEach(todo=>{
      todo.fromnow=moment(todo.fromnow).fromNow();

 	});
  

 });
 console.log(this.users);

 });

 function updateTime() {
  var dateInfo = new Date();

  /* time */
  var hr,
    _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
    sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
    ampm = (dateInfo.getHours() >= 12) ? "PM" : "AM";

  // replace 0 with 12 at midnight, subtract 12 from hour if 13–23
  if (dateInfo.getHours() == 0) {
    hr = 12;
  } else if (dateInfo.getHours() > 12) {
    hr = dateInfo.getHours() - 12;
  } else {
    hr = dateInfo.getHours();
  }

  var currentTime = hr + ":" + _min + ":" + sec;

  // print time
  if(document.getElementsByClassName("hms")[0])
  document.getElementsByClassName("hms")[0].innerHTML = currentTime;
if(document.getElementsByClassName("ampm")[0])
  document.getElementsByClassName("ampm")[0].innerHTML = ampm;

  /* date */
  var dow = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    day = dateInfo.getDate();

  // store date
  var currentDate = dow[dateInfo.getDay()] + ", " + month[dateInfo.getMonth()] + " " + day;
if( document.getElementsByClassName("date")[0])
  document.getElementsByClassName("date")[0].innerHTML = currentDate;
};

// print time and date once, then update them every second
updateTime();
setInterval(function() {
  updateTime()
}, 1000);

  





  }




  }


  


