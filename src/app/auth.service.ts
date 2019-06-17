import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User;
  errorCode: any;
  errorMessege: any;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(result=>{
      this.router.navigate(['home']);

    }).catch(error => {
      var errorCode = error.code;
      this.errorMessege = error.message;

    });
  }

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
