import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  navLinks = [
    {path: '/student-registration', label: 'Register Student'},
    {path: '/issue-card', label: 'Add Payment'},
    {path: '/mark-card', label: 'Mark Attendance'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
