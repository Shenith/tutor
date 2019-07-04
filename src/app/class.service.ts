import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private db:AngularFireDatabase, private router: Router) { }


  create(newClass){
    this.router.navigate(['home']);
    return this.db.list('/class').push(newClass);

  };

  getall(){
    let ref = this.db.list('/class',ref=>ref.orderByChild('grade')).snapshotChanges();
    return ref;
  }

  getClass(classDetail){
    localStorage.setItem('classDetail',JSON.stringify(classDetail));
  }
}
