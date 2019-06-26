import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StudentCardComponent } from '../student-card/student-card.component';


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

  constructor(
    private studentService:StudentsService, 
    private db:AngularFireDatabase, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {  
  this.changeNumber();

  }

  changeNumber() {
    
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));

    this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges().subscribe(items=>{
      if(items.length>0){
        this.studentDetail = items[items.length-1].payload.val();
        
        if(this.classDetail.grade<10){
          this.studentNumber = parseInt(this.studentDetail.studentNumber.slice(3), 10)+1;
        } else{
          this.studentNumber = parseInt(this.studentDetail.studentNumber.slice(4), 10)+1;
        }
        this.studentCode = this.studentDetail.studentNumber;
      } else {
        this.studentCode = 1;
      }
      
    })
    
  }

  openSnackBar(messege){
    this.snackBar.open(messege , "" , {duration: 3000});
  }


  register(f){
    this.changeNumber();
    if(f.value.name){
      this.studentService.create(f.value,this.studentNumber);
    f.reset();
    this.openSnackBar(" Registered successfully!");
    this.dialog.open(StudentCardComponent,{
      width: '80vw'
    });
    this.router.navigate(['issue-card']);
    }

  }

}
