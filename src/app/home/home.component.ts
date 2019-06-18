import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ClassService } from '../class.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  classes: any[] = [];
  classDetail: any = null;

  constructor(private classService: ClassService) {
    this.classService.getall().pipe(
      map(changes =>
        changes.map(c => ({key:c.payload.key,...c.payload.val()}))
      )
    ).subscribe(classes => {
      this.classes = classes;})
   }

  ngOnInit() {
  }

  getClass(c){
    this.classDetail = c;
    this.classService.getClass(c);
  }



}
