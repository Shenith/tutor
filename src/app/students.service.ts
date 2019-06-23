import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  classDetail: any;
  constructor(private db:AngularFireDatabase, private router: Router) { }
  create(newStudent,studentNumber){
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    return this.db.list('/class/' + this.classDetail.key + '/students').push({studentDetails:newStudent, studentNumber: studentNumber});
  };

  getAll(){
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    var r = this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges();
    return r;
  }

  getClassStudents(classKey){
    return this.db.list('/class/' + classKey + '/students').snapshotChanges();
  }

  issueCard(sId,date,lastPayedDate){
    this.db.list('/class/' + this.classDetail.key + '/students/' + sId + '/paymentHistory/').push({lastPayedDate});
    return this.db.object('/class/' + this.classDetail.key + '/students/' + sId + '/cardIssueDate/').set({date});
  }

  issueFirstCard(sId,date){
    return this.db.object('/class/' + this.classDetail.key + '/students/' + sId + '/cardIssueDate/').set({date});
  }

  markCard(sId,date){
    return this.db.list('/attendance/' + this.classDetail.key + '/students/' + sId + '/attendance/').push({date})
  }


}