import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  public myAngularxQrCode: String = null;
  yes = false;

  constructor() { }

  ngOnInit() {
    this.myAngularxQrCode = null;
  }

  generate(f){
    if(f.value.sNumber){
      this.myAngularxQrCode = f.value.sNumber;
      this.yes = true;
    }
  }

}
