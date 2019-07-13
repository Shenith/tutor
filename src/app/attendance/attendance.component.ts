import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceRecord:any; 

  constructor(private attendanceService: AttendanceService,) { }

  ngOnInit() {
  let sId = JSON.parse(localStorage.getItem('sId'));
  let classId = JSON.parse(localStorage.getItem('classId'));
  this.attendanceService.getAttendance(sId,classId).pipe(
    map(changes =>
      changes.map(c => ({key:c.payload.key,...c.payload.val()}))
    )
  ).subscribe(data => {
    this.attendanceRecord = data;
  });
  }

}
