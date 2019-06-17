import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.css']
})
export class ClassCardComponent implements OnInit {
  @Input('class') class: any;
  constructor() { }

  ngOnInit() {
  }

}
