import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  appUser: any;
  className: any;
  classDetail: any;
  constructor(private authService: AuthService, public router: Router) {
    //this.appUser=JSON.parse(localStorage.getItem('user'));
  }

  async ngOnInit() {
    await this.authService.afAuth.authState.subscribe(appUser=>this.appUser=appUser);
    
  }

  async logout(){
    await this.authService.afAuth.auth.signOut();
    localStorage.removeItem('user');
    
    this.router.navigate(['']);
  }
}
