import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  appUser: any;
  className: any;
  classDetail: any;
  route: any;
  constructor(private authService: AuthService, public router: Router , private navbarService: NavbarService) {
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
  }

  async ngOnInit() {
    await this.authService.afAuth.authState.subscribe(appUser=>this.appUser=appUser);
    this.classDetail= localStorage.getItem('classDetail');
  }

  async logout(){
    await this.authService.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('classDetail');
    this.router.navigate(['']);
  }
}
