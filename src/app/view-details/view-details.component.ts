import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from '../class.service';
import { map } from 'rxjs/operators';
import { StudentsService } from '../students.service';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  classes:any;
  students: any;
  studentCount: number;

  items:any[];
  itemCount:number;

  tableResource: DataTableResource<any[]>

  constructor(private classService: ClassService, private studentsService : StudentsService) { }

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
    await this.studentsService.getClassStudents(c.key).pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    ).subscribe(data => {
      this.students = data;
    });
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then( items => this.items = items );
  }
}
