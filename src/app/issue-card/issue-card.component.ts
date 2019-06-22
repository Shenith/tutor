import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { map, take } from 'rxjs/operators';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { Student } from '../student'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent implements OnInit {

  result:any[];
  getall:any;
  sName:any;
  sId:any;
  student:Student;
  lastPayedDate:any;
  classDetail:any;


  constructor(private studentService: StudentsService, private datepipe: DatePipe,private router: Router) { }

  ngOnInit() {
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    this.getall = this.studentService.getAll().pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    );
  }

  check(f){
    this.getall.subscribe(res=>{
      this.result=res;
      this.result.filter(s=>{
        if(s.studentNumber == f.value.studentNumber){
          this.sName = s.studentDetails.name;
          this.sId = s.key;
          this.lastPayedDate = s.cardIssueDate.date;

        }
      })
    });
  }

  done(){
    var today = new Date();
    var day=this.datepipe.transform(today, 'yyyy-MM-dd');
    if(!this.lastPayedDate){
      this.studentService.issueFirstCard(this.sId,day);
    } else {
      this.studentService.issueCard(this.sId,day,this.lastPayedDate);
    }
  }
}
