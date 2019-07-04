import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-qr-generater',
  templateUrl: './qr-generater.component.html',
  styleUrls: ['./qr-generater.component.css']
})
export class QrGeneraterComponent implements OnInit {

  yes:boolean = false;
  text: String = "Shenith";
  classDetail:any;
  studentDetail:any;

  public myAngularxQrCode: String = null;

  constructor(private db:AngularFireDatabase) { 
    
    this.myAngularxQrCode= null;
  }

  ngOnInit() {

    this.classDetail = JSON.parse(localStorage.getItem('classDetail'));

    this.db.list('/class/' + this.classDetail.key + '/students').snapshotChanges().subscribe(items => {
      this.studentDetail = items[items.length-1].payload.val();
      this.myAngularxQrCode = this.studentDetail.studentNumber;
    })


  }

  generate(){
    this.yes=true;
  }

}
