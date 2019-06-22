import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-mark-card',
  templateUrl: './mark-card.component.html',
  styleUrls: ['./mark-card.component.css']
})
export class MarkCardComponent implements OnInit {

  result:any[];
  getall:any;
  sName:any;
  sId:any;
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

  next(){
    var today = new Date();
    var day=this.datepipe.transform(today, 'yyyy-MM-dd');
  
    this.studentService.markCard(this.sId,day);
    
  }

}
