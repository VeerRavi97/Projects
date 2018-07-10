import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


 
import "rxjs/Rx";

@Injectable()
export class TodoService {

  
   
  constructor(private http:Http) {}

//===================DETALL====================//

getTodos()
{

	let headers=new Headers();
	let token=localStorage.getItem('token');
	console.log("gettodos");
	console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});

return this.http.get("/api/todos",options)
.map(res=>res.json());



}





//================USER SPECIFIC=================//






getTodo(username)
{
console.log(username);
return this.http.get(`/api/todos/${username}`)
.map(res=>res.json());



}



//====================CREATE TODO=====================//





 
createtodo(newtodo){

// console.log("newtodo is ",newtodo);

let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	// console.log('options',options);
 	return this.http.post("/api/todos",newtodo,options)
 	           .map(res=>res.json());




}


//===========================REMOVE TODO=================//

removeTodo(todo){

  console.log("To be removed",todo);

  let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	// console.log('options',options);
  return this.http.delete(`/api/todos/${todo}`,options)
  .map(res=>res.json());

}



//=====================UPDATE TODO=====================//


updateTodo(todo){
 console.log("To be updated",todo);

 let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	// console.log('options',options);
  return this.http.put(`/api/todos/${todo.id}`,todo,options)
  .map(res=>res.json());


	
}


   

errorHandler(error :HttpErrorResponse){

return Observable.throw(error.message||"Something went wrong");

}




}