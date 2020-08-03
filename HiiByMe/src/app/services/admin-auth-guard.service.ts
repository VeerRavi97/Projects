import { Injectable } from '@angular/core';
import {CanActivate,Router,RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
  	private authService:AuthService,
  	private router:Router,
  	
  	) {}


canActivate(){

if(this.authService.isAdmin) return true;
this.router.navigate(['/no-access']);
return false;


}



}
