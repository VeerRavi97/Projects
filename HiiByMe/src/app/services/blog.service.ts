import { Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http";
import {JwtHelper} from 'angular2-jwt';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Subject} from  'rxjs/Subject';


@Injectable()
export class BlogService {

	 changeTitle=new Subject();

  constructor(private http:Http) {}

 
getBlogs(){

	let headers=new Headers();
	let token=localStorage.getItem('token');
	console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	


 	return this.http.get("/blog",options)
 	           .map(res=>res.json());
 	
 }


getBlog(slug){

  console.log(slug);
  return this.http.get(`/blog/${slug}`)
 	           .map(res=>res.json());



}



getblog(username)
{
console.log(username);
return this.http.get(`/api/blogs/${username}`)
.map(res=>res.json());



}


createblog(newblog){


let headers=new Headers();
	let token=localStorage.getItem('token');
	console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	console.log('options',options);
 	return this.http.post("/api/blogs",newblog,options)
 	           .map(res=>res.json());




}





   removeBlog(blog){

  console.log("To be removed",blog);

  let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	// console.log('options',options);
  return this.http.delete(`/api/blogs/${blog}`,options)
  .map(res=>res.json());

}



UpdateBlog(data){

  console.log("To be removed",data);

  let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
	// console.log('options',options);
  return this.http.put(`/api/blog/${data.id}`,data,options)
  .map(res=>res.json());

}

Liked(data)
{
let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);
	

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
  return this.http.put(`/api/blog/${data.id}`,data,options)
  .map(res=>res.json());

}



Commented(data)
{
let headers=new Headers();
	let token=localStorage.getItem('token');
	// console.log('token is',token);
 

	headers.append('Authorization','Bearer '+ token);
	let options=new RequestOptions({headers:headers});
  return this.http.post(`/api/comment/${data.id}`,data,options)
  .map(res=>res.json());

}









 

}
