import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  classDetail: any;
  studentNumber: any = 1;
  studentDetail: any;
  studentCode: any;

  constructor(private studentService:StudentsService, private db:AngularFireDatabase, private snackBar: MatSnackBar) { }

  ngOnInit() {  
    this.refreshPage();

  }

  refreshPage() {
    
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));

    this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges().subscribe(items=>{
      if(items.length>0){
        this.studentDetail = items[items.length-1].payload.val();
        this.studentCode = this.studentDetail.studentNumber;
        if(this.classDetail.grade<10){
          this.studentNumber = parseInt(this.studentDetail.studentNumber.slice(3), 10)+1;
        } else{
          this.studentNumber = parseInt(this.studentDetail.studentNumber.slice(4), 10)+1;
        }
        
      } else {
        this.studentCode = 1;
      }
      
    })
    
  }

  openSnackBar(messege){
    this.snackBar.open(this.studentCode + messege , "" , {duration: 3000});
  }


  async register(f){
    if(f.value.name){
      await this.studentService.create(f.value,this.studentNumber);
    f.reset();
    this.openSnackBar(" Registered successfully!");
    this.refreshPage();
    }
  }

}
