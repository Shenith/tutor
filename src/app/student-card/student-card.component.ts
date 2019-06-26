import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnInit {
  classDetail: any;
  studentNumber: any = 1;
  studentDetail: any;
  studentCode: any;
  studentName: any;
  studentAddress: any;
  studentSchool: any;
  studentPhone: any;

  constructor(private db:AngularFireDatabase) { }

  ngOnInit() {
    this.getStudentDetails();
  }

  getStudentDetails(){
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));

    this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges().subscribe(items=>{
      if(items.length>0){
        this.studentDetail = items[items.length-1].payload.val();

        this.studentName = this.studentDetail.studentDetails.name;
        this.studentAddress = this.studentDetail.studentDetails.address;
        this.studentSchool = this.studentDetail.studentDetails.school;
        this.studentPhone = this.studentDetail.studentDetails.phone;
        this.studentCode = this.studentDetail.studentNumber;
      }
      
    })
  }
}
