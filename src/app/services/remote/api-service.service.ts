import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigService} from "../configs/config.service";
import {catchError, map, Observable, of} from "rxjs";
import {ResultState, Error,Success} from "../../shared/ResultState";
import {AuthResponseModel, ResponseModel} from "../../shared/ResponseModel";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient,private configService: ConfigService) { }

  LoginEvent(email : string, password: string): Observable<ResultState<AuthResponseModel>> {
    const logUrl = this.configService.getBaseUrl()+ "/auth/login";
    return this.http.post<AuthResponseModel>(logUrl,{email: email, password: password}).pipe(
      map(response => new Success<AuthResponseModel>(response)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<AuthResponseModel>(message));
      })
    );
  }

  OTPEvent(email : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth/generateotp/${email}`;
    return this.http.post<ResponseModel>(logUrl,{}).pipe(
      map(response => new Success<string>( response.message || `OTP has sent to ${email}`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  VerifyOTPEvent(email : string,otp : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth/verify/${email}`;
    return this.http.post<ResponseModel>(logUrl,{otp}).pipe(
      map(response => new Success<string>( response.message || `OTP has sent to ${email}`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  SignUpEvent(firstName : string,lastName : string,email : string,password : string,phoneNumber : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth/signup`;
    return this.http.post<ResponseModel>(logUrl,{firstName : firstName,lastName : lastName, email : email, password : password, phoneNumber : phoneNumber}).pipe(
      map(response => new Success<string>( response.message || `User Verified`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  ChangePassword(email : string, password : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth/changepassword`;
    return this.http.post<ResponseModel>(logUrl,{ email : email, password : password}).pipe(
      map(response => new Success<string>( response.message || `User Password Changed`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }



}
