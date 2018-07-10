import { Component, OnInit, ViewChild,NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import {ActivatedRoute} from "@angular/router";


import {AuthService} from "../services/auth.service";
import {TodoService} from "../services/todo.service";
import * as _ from 'lodash';
import * as moment from 'moment';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

 isLogged:boolean=false;
 todos:any[]=[];
  now = moment().format('LLLL');
 todo:any;
 isLoaded:boolean=false;
 isOwned:boolean=false;
 popupmessage:boolean=false;
 date:any;
 diff:any;

  constructor(private auth :AuthService,private service :TodoService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit() {

   this.isLogged=this.auth.isLoggedIn();
   

 console.log("is logged in",this.isLogged);


let username=this.route.snapshot.params['id'];
 console.log("owner is",username);
 console.log("currentuser is",this.auth.CurrentUser);
if(username===this.auth.CurrentUser)
     this.isOwned=true;

    console.log("is owned  ",this.isOwned);

   console.log(username);
     this.spinner.show();
   this.route.paramMap
   .subscribe(params=>{
     this.service.getTodo(username)

      .subscribe(res=>{
     
        this.todos = _.values(res.todos);
        // this.todos = _.orderBy(this.todos, ['this.todos.created'],['desc']); 
       console.log(this.todos);
        
        this.isLoaded=true;
         this.spinner.hide();
   
      })

   });


   }



  createtodo(e){
    if(this.isOwned){
      let newtodo:object={
       "newtodo":e.value
        };
    console.log(e.value);

    console.log(typeof(newtodo));
    this.service.createtodo(newtodo)
    .subscribe(res=>{
      
   
      
        console.log("from now",res.fromnow);
        console.log(this.todos);
      this.todos.unshift(res);
      console.log(this.todos);
      
    });

    }
    else{
     this.popupmessage=true;

    }

      

  }






  removeTodo(todo){

     if(this.isOwned){

    let id=todo._id;
    // console.log(id);
  this.service.removeTodo(id)
  .subscribe(res=>{

  let index=this.todos.indexOf(todo);
    this.todos.splice(index,1);
  });
   }
  
  }
  


  updateTodo(todo){
    if(this.isOwned){

  let isDone = !todo.completed;
  let id=todo._id;
    console.log(" negattion of isDone pehle",isDone);
   let Updatedtodo = {
      id:id,
     completed: isDone}
    console.log(Updatedtodo);
  this.service.updateTodo(Updatedtodo)
  .subscribe(res=>{

   console.log(res);
    todo.completed=isDone;
   // this.todos.shift();
  });

  }
    
  }




}
