import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DataTableModule } from 'angular7-data-table';
import {NoopAnimationsModule , BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatSnackBarModule} from '@angular/material';


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
import { AuthGuardService } from './auth-guard.service';
import { AttendanceComponent } from './attendance/attendance.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { QrGeneraterComponent } from './qr-generater/qr-generater.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

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
    AttendanceComponent,
    QrGeneraterComponent,
    StudentCardComponent,
    QrCodeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    QRCodeModule,
    MatCheckboxModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'student-registration', component: StudentRegistrationComponent, canActivate: [AuthGuardService] },
      { path: 'issue-card', component: IssueCardComponent, canActivate: [AuthGuardService] },
      { path: 'mark-card', component: MarkCardComponent, canActivate: [AuthGuardService] },
      { path: 'view-details', component: ViewDetailsComponent, canActivate: [AuthGuardService] },
      { path: 'add-class-form', component: AddClassFormComponent, canActivate: [AuthGuardService] },
      { path: 'main-page', component: MainPageComponent,canActivate: [AuthGuardService] },
      { path: 'student-card', component: StudentCardComponent,canActivate: [AuthGuardService] },
      { path: 'qr-code', component: QrCodeComponent,canActivate: [AuthGuardService] },

    ])
  ],
  entryComponents:[
    AttendanceComponent,
    LoginComponent,
    StudentCardComponent,
  ],
  providers: [
    AuthService,
    ClassService,
    StudentsService,
    DatePipe,
    NavbarService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
