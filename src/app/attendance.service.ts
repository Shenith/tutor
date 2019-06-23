import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
 
  constructor(private db:AngularFireDatabase, private router: Router) { }

  getAttendance(sId,classId){
    console.log(sId,classId);
     let r = this.db.list('/attendance/' + classId + '/students/' + sId + '/attendance').snapshotChanges();
     return r;
  }
}