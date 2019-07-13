import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { map, take } from 'rxjs/operators';
import { Student } from '../student'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';

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
  btn:boolean = true;
  lastPayedMonth:any;
  month:any;
  months:Array<Object> = [
    {id: 1, name: "January"},
    {id: 2, name: "February"},
    {id: 3, name: "March"},
    {id: 4, name: "April"},
    {id: 5, name: "May"},
    {id: 6, name: "June"},
    {id: 7, name: "July"},
    {id: 8, name: "August"},
    {id: 9, name: "September"},
    {id: 10, name: "October"},
    {id: 11, name: "November"},
    {id: 12, name: "December"}
];


  constructor(private studentService: StudentsService, 
    private datepipe: DatePipe,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.btn = true;
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    this.getall = this.studentService.getAll().pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    );
  }

  check(f){
    this.month=f.value.month;
    try{
      this.getall.subscribe(res=>{
        this.result=res;
        this.result.filter(s=>{
          if(s.studentNumber == f.value.studentNumber){
            this.btn= false;
            this.sName = s.studentDetails.name;
            this.sId = s.key;
            if(s.lastPayment.date){
              this.lastPayedDate = s.lastPayment.date;
              this.lastPayedMonth = s.lastPayment.month;
            }else{
              this.lastPayedDate = "Initial Payment";
              this.lastPayedMonth = 0;
            }
          }
        })
      });
    }catch(err){
      console.log("ERRRRRR");
      console.log(err);
    }
  }

  openSnackBar(messege){
    return this.snackBar.open(messege , "" , {duration: 5000});
  }

  done(f){
    var today = new Date();
    var day=this.datepipe.transform(today, 'yyyy-MM-dd');
    if(!this.lastPayedDate){
      this.studentService.issueFirstCard(this.sId,day,this.month);
    } else {
      this.studentService.issueCard(this.sId,day,this.lastPayedDate,this.month);
    }
    this.openSnackBar(" Added Payment date: "+ day);
    f.reset();
    this.sName = null;
    this.sId = null;
    this.lastPayedDate = null;
    this.lastPayedMonth = null;
  }
  
}
