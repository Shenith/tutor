import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  async login(f){
    await this.authService.login(f.value.email,f.value.password);
    this.error = await this.authService.errorMessege;
  }

}
