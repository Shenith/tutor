import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  classDetail: any;
  studentNumber: any;
  constructor(private studentService:StudentsService, private db:AngularFireDatabase) { }

  ngOnInit() {  
    this.refreshPage();
  }

  refreshPage() {
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges().subscribe(items=>{
      console.log(items.length);
      this.studentNumber = items.length + 1;
    })
    
  }

  
  async register(f){
    console.log(f.value);
    await this.studentService.create(f.value,this.studentNumber);
    this.refreshPage();
  }

}
