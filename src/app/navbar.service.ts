import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  route:any;
  constructor(private db:AngularFireDatabase, private router: Router) { }

  currentRoute(r){
    this.route = r;
  }
}
