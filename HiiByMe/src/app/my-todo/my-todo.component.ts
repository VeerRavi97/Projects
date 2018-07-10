import { Component, OnInit, ViewChild,NgModule,HostBinding} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import {ActivatedRoute} from "@angular/router";
import {fade,slide,routeslide,expandCollapse} from "../animations"




import {AuthService} from "../services/auth.service";
import {TodoService} from "../services/todo.service";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-my-todo',
  templateUrl: './my-todo.component.html',
  styleUrls: ['./my-todo.component.css'],
  animations: [fade,slide,routeslide,expandCollapse]
  
  
})
export class MyTodoComponent implements OnInit {

@HostBinding('@routeslide') routeAnimation=true;


  isLogged:boolean=false;
 todos:any[]=[];
  now = moment().format('LLLL');
 todo:any;
 isLoaded:boolean=false;
 isOwned:boolean=false;
 popupmessage:boolean=false;
 date:any;
 diff:any;

 isExpanded:boolean;



  constructor(private auth :AuthService,private service :TodoService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit() {

   this.isLogged=this.auth.isLoggedIn();
   

 // console.log("is logged in",this.isLogged);


let username=this.route.snapshot.params['id'];
 console.log("owner is",username);
 console.log("currentuser is",this.auth.CurrentUser);
if(username===this.auth.CurrentUser)
     this.isOwned=true;


    console.log("is owned  ",this.isOwned);

   // console.log(username);
     this.spinner.show();
   this.route.paramMap
   .subscribe(params=>{
     this.service.getTodo(username)

      .subscribe(res=>{


         res.todos.forEach(todo=>{
      todo.fromnow=moment(todo.fromnow).fromNow();
     

       });


     
        this.todos = _.values(res.todos);
       
       console.log(this.todos);
        
        this.isLoaded=true;
         this.spinner.hide();
   
      })

   });


   }


  toggle(){

    this.isExpanded=!this.isExpanded;
    console.log(this.isExpanded);
  }



  createtodo(inputelement:HTMLInputElement){

    if(this.isOwned){


     
      let newtodo:object={
       "newtodo":inputelement.value
        };
   
     
    console.log("value is",inputelement.value);
   
    
    this.service.createtodo(newtodo)
    .subscribe(res=>{
      
 

        // console.log("from now",res.fromnow);
         console.log("value is",inputelement.value);
        // console.log(this.todos);
      this.todos.unshift(res);
      // console.log(this.todos);
   inputelement.value="";
      // console.log("value is",inputelement.value);
      
    });

    }
    else{
     this.popupmessage=true;

    }

      

  }






  removeTodo(todo){
    console.log("to be deleted",todo.name);
        if(this.isOwned){
    let id=todo._id;
    console.log(id);
  this.service.removeTodo(id)
  .subscribe(res=>{

    let index=this.todos.indexOf(todo);
    this.todos.splice(index,1);

   console.log(res);
  
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



show(){

  console.log("toggled");

}


}
