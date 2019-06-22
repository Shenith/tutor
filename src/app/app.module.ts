import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { MarkCardComponent } from './mark-card/mark-card.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

import { AuthService } from './auth.service';
import { ClassCardComponent } from './class-card/class-card.component';
import { ClassService } from './class.service';
import { AddClassFormComponent } from './add-class-form/add-class-form.component';
import { StudentsService } from './students.service';
import { DatePipe } from '@angular/common';
import { NavbarService } from './navbar.service';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    StudentRegistrationComponent,
    IssueCardComponent,
    MarkCardComponent,
    ViewDetailsComponent,
    ClassCardComponent,
    AddClassFormComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'student-registration', component: StudentRegistrationComponent },
      { path: 'issue-card', component: IssueCardComponent },
      { path: 'mark-card', component: MarkCardComponent },
      { path: 'view-details', component: ViewDetailsComponent },
      { path: 'add-class-form', component: AddClassFormComponent },
      { path: 'main-page', component: MainPageComponent },

    ])
  ],
  providers: [
    AuthService,
    ClassService,
    StudentsService,
    DatePipe,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
