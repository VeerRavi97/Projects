import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


 
import "rxjs/Rx";

@Injectable()
export class AuthService {

  

  constructor(private http:Http) {}

  

 getTodos(){

 	return this.http.get("/api/todos")
 	           .map(res=>res.json());
 	
 }

 UserRegister(user){
 	console.log(user);
 	console.log("type is",typeof(user));

 	return this.http.post("/register",user)
 	           .map(res=>res.json());
 	
 }

 UserSignin(user){
 	

 	return this.http.post("/login",user)
 	           .map(res=>{
                let result=res.json();
                if(result&&result.token){
                	localStorage.setItem('token',result.token);
                	return true;
                }

              return false;

 	           })
 	           .catch(this.errorHandler);
 	
 }



logout(){

	localStorage.removeItem('token');
}


isLoggedIn(){

	let jwtHelper=new JwtHelper();
	let token=localStorage.getItem("token");

	if(!token)
		return false;
	let expirationDate=  jwtHelper.getTokenExpirationDate(token);

	let isExpired=jwtHelper.isTokenExpired(token);
   // console.log(`Expiry ${expirationDate}`);
   //   console.log(`isExpired ${isExpired}`);

	return !isExpired;
}



  get CurrentUser(){

	let token=localStorage.getItem("token");
	if(!token) return null;
	
	return new JwtHelper().decodeToken(token).username;

}



get isAdmin(){

	let token=localStorage.getItem("token");
	if(!token) return null;
	
	return new JwtHelper().decodeToken(token).isAdmin;

}

errorHandler(error :HttpErrorResponse){

return Observable.throw(error.message||"Something went wrong");

}




}