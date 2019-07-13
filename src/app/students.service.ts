import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  classDetail: any;
  firstLetter: String;
  firstNumber: String;
  studentNumber: String;

  constructor(private db:AngularFireDatabase, private router: Router) { }
  create(newStudent,studentNumber){
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    this.firstLetter = this.classDetail.subject.charAt(0).toUpperCase() + this.classDetail.subject.charAt(1).toUpperCase();
    this.firstNumber = this.classDetail.grade;
    this.studentNumber = (this.firstLetter + "" + this.firstNumber + "" + studentNumber.toString());
    let r = this.db.list('/class/' + this.classDetail.key + '/students').push({studentDetails:newStudent, studentNumber: this.studentNumber});
    return r;
  };

  getAll(){
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    var r = this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges();
    return r;
  }

  getClassStudents(classKey){
    return this.db.list('/class/' + classKey + '/students').snapshotChanges();
  }

  issueCard(sId,date,lastPayedDate,month){
    this.db.list('/class/' + this.classDetail.key + '/students/' + sId + '/paymentHistory/').push({lastPayedDate});
    return this.db.object('/class/' + this.classDetail.key + '/students/' + sId + '/lastPayment/').set({date:date,month:month});
  }

  issueFirstCard(sId,date,month){
    return this.db.object('/class/' + this.classDetail.key + '/students/' + sId + '/lastPayment/').set({date:date,month:month});
  }

  markCard(sId,date){
    return this.db.list('/attendance/' + this.classDetail.key + '/students/' + sId + '/attendance/').push({date})
  }


}