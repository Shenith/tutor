import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { map, take } from 'rxjs/operators';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { Student } from '../student'
import { DatePipe } from '@angular/common';

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


  constructor(private studentService: StudentsService, private datepipe: DatePipe) { }

  ngOnInit() {
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
        }
      })
    });


  }

  done(){
    var today = new Date();
    var day=this.datepipe.transform(today, 'yyyy-MM-dd');

    this.studentService.issueCard(this.sId,day);
  }

}
