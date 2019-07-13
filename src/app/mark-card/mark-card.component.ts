import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AttendanceComponent } from '../attendance/attendance.component';
import { MatDialog } from '@angular/material/dialog';

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
  btn:boolean = true;
  lastPayedMonth:any;
  warning:string = "";

  constructor(private studentService: StudentsService, 
    private datepipe: DatePipe,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.btn= true;
    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));
    this.getall = this.studentService.getAll().pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    );
  }

  check(f){
    var today = new Date();
    this.btn= false;
   
    try{
      this.getall.subscribe(res=>{
        this.result=res;
        this.result.filter(s=>{
          if(s.studentNumber == f.value.studentNumber){
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

  next(f){

    var today = new Date();
    var thisMonth = today.getMonth()+1;
    
    console.log(f);
    if(thisMonth == this.lastPayedMonth){
      var day=this.datepipe.transform(today, 'yyyy-MM-dd');
      this.studentService.markCard(this.sId,day);
      localStorage.setItem('sId', JSON.stringify(this.sId));
      this.dialog.open(AttendanceComponent, {
      });
      f.reset();
      this.sName = null;
      this.sId = null;
      this.lastPayedDate = null;
      this.lastPayedMonth = null;

    }else{
      this.warning="You have not payed for this month";
    }

  }

}
