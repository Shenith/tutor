import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  classDetail: any;
  item:any;
  constructor(private db:AngularFireDatabase, private router: Router) { }
  create(newStudent,studentNumber){
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    
    
    // await this.db.object('/class/' + this.classDetail.key).valueChanges().pipe().subscribe(item =>{
    //   this.item = item;
    //   console.log("item " + item);
    //   if(this.item.qty==0){
    //     console.log("return");
    //     this.db.object('/class/' + this.classDetail.key).update({qty:4});
    //   } else {
    //     console.log( this.item.qty+2);
    //     this.db.object('/class' + this.classDetail.key).update({qty: this.item.qty + 5})
    //   }
      
    // });
    
    return this.db.list('/class/' + this.classDetail.key + '/students').push({studentDetails:newStudent, studentNumber: studentNumber});
  };
}