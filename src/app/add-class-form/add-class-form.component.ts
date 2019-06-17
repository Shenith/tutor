import { Component, OnInit } from '@angular/core';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-add-class-form',
  templateUrl: './add-class-form.component.html',
  styleUrls: ['./add-class-form.component.css']
})
export class AddClassFormComponent implements OnInit {

  constructor(private classService: ClassService) { }

  ngOnInit() {
  }

  create(f){
    this.classService.create(f.value);
  }
}
