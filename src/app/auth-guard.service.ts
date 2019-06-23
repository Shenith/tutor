import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router,CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(){
    var user = this.auth.user;
    
      if(user)return true;

      this.router.navigate(['']);
      return false;  
    
  }
}