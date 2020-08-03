import { Component, Injectable} from '@angular/core';
import {Subject} from  'rxjs/Subject';
import {Observable} from "rxjs/Observable";
import {Http,Headers,RequestOptions} from "@angular/http";

import {HttpErrorResponse} from "@angular/common/http";



@Injectable()
export class DataService {

  
 constructor(private http:Http) {}
   changeTitle=new Subject();

   SendMessage(message){

    return this.http.post("/api/message",message)
 	           .map(res=>res.json());
     

   }




}