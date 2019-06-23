import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from '../class.service';
import { map } from 'rxjs/operators';
import { StudentsService } from '../students.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceComponent } from '../attendance/attendance.component';



@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  classes:any;
  students: any;
  attendanceRecord:any; 

  constructor(private classService: ClassService, 
    private studentsService : StudentsService,
    public dialog: MatDialog) { }

  async ngOnInit() {
    return await this.classService.getall().pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    ).subscribe(classes => {
      this.classes = classes;
    });
  }

   async view(c){
     localStorage.setItem('classId', JSON.stringify(c.key));
    await this.studentsService.getClassStudents(c.key).pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    ).subscribe(data => {
      this.students = data;
      console.log(this.students);
    });
  }

  attendance(sId){
    localStorage.setItem('sId', JSON.stringify(sId));
    this.dialog.open(AttendanceComponent, {
    });
  }
  }

