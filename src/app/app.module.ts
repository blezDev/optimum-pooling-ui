import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxOtpInputComponent} from "ngx-otp-input";
import {LoadingComponent} from "./shared/loading/loading.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
        LoadingComponent,
        MatNativeDateModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        SocialLoginModule,
        GoogleSigninButtonModule,
        MatAutocompleteModule,
        TranslateModule.forRoot({
          loader : {
            provide: TranslateLoader,
            useFactory : HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
    ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue : {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('263620112727-u30qjpfp4satlg2fb80puu5pttncep4q.apps.googleusercontent.com'),
        },

      ],
  onError: (error)=> console.log(error),
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
