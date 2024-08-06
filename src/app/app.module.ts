import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatRippleModule } from '@angular/material/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationComponent } from './verification/verification.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';
import {NgOptimizedImage} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {NgxOtpInputComponent} from "ngx-otp-input";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    VerificationComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    HomeComponent,
    PublishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatSnackBarModule,
    HttpClientModule,
    NgxOtpInputComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
