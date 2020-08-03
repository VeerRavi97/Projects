import { Injectable } from '@angular/core';
import {CanActivate,Router,RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard{

  constructor(
  	private authService:AuthService,
  	private router:Router,
  	
  	) {}

canActivate(route,state:RouterStateSnapshot){

if(this.authService.isLoggedIn()) return true;
console.log(state.url);
this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
return false;


}



}
