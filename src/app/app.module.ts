import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { MarkCardComponent } from './mark-card/mark-card.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    StudentRegistrationComponent,
    IssueCardComponent,
    MarkCardComponent,
    ViewDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'student-registration', component: StudentRegistrationComponent },
      { path: 'issue-card', component: IssueCardComponent },
      { path: 'mark-card', component: MarkCardComponent },
      { path: 'view-details', component: ViewDetailsComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
