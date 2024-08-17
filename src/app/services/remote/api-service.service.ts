import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigService} from "../configs/config.service";
import {catchError, map, Observable, of} from "rxjs";
import {ResultState, Error,Success} from "../../shared/ResultState";
import {AuthResponseModel, ResponseModel} from "../../shared/ResponseModel";
import {FetchModel} from "../../billing/FetchModel";
import {TripModel} from "../../trip-history/TripModel";
import {Cities} from "../../home/Cities";
import {CarModel} from "../../publish/CarModels";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(private http: HttpClient,private configService: ConfigService) { }



  LoginEvent(email : string, password: string): Observable<ResultState<AuthResponseModel>> {
    const logUrl = this.configService.getBaseUrl()+ "/auth-service/auth/login";
    return this.http.post<AuthResponseModel>(logUrl,{email: email, password: password}).pipe(
      map(response => new Success<AuthResponseModel>(response)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<AuthResponseModel>(message));
      })
    );
  }

  OTPEvent(email : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth-service/auth/generateotp/${email}`;
    return this.http.post<ResponseModel>(logUrl,{}).pipe(
      map(response => new Success<string>( response.message || `OTP has sent to ${email}`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  VerifyOTPEvent(email : string,otp : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth-service/auth/verify/${email}`;
    return this.http.post<ResponseModel>(logUrl,{otp}).pipe(
      map(response => new Success<string>( response.message || `OTP has sent to ${email}`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  SignUpEvent(firstName : string,lastName : string,email : string,password : string,phoneNumber : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth-service/auth/signup`;
    return this.http.post<ResponseModel>(logUrl,{firstName : firstName,lastName : lastName, email : email, password : password, phoneNumber : phoneNumber}).pipe(
      map(response => new Success<string>( response.message || `User Verified`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  GoogleLogin(firstName : string,lastName : string,email : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth-service/auth/googlesignup`;
    return this.http.post<ResponseModel>(logUrl,{ email : email, firstName : firstName,lastName : lastName}).pipe(
      map(response => new Success<string>( response.message || `User Logged in.`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }


  ChangePassword(email : string, password : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/auth-service/auth/changepassword`;
    return this.http.post<ResponseModel>(logUrl,{ email : email, password : password}).pipe(
      map(response => new Success<string>( response.message || `User Password Changed`)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }
  TripBill(startDestination : string, endDestination : string,numberOfPassenger : number,kmPrice : number,name : string): Observable<ResultState<FetchModel>> {
   const logUrl = `${this.configService.getBaseUrl()}/billing-service/bill/trip`;
   // const logUrl = `http://localhost:9090/bill/trip`;
    return this.http.post<FetchModel>(logUrl,{ startDestination : startDestination, endDestination : endDestination,numberOfPassenger : numberOfPassenger,kmPrice : kmPrice,name : name}).pipe(
      map(response => new Success<FetchModel>( response)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<FetchModel>(message));
      })
    )
  }

  BookTrip(c_userId : string, c_name : string,c_email : string,rideSource : string,rideDestination : string,rideDate : string,fare : string,carName : string,carNumber : string,r_email : string,r_userId : string,seatsOccupied : string ,r_name : string): Observable<ResultState<string>> {
    const logUrl = `${this.configService.getBaseUrl()}/trip-service/trip/createTrip`;
    // const logUrl = `http://localhost:9090/bill/trip`;
    return this.http.post<ResponseModel>(logUrl,{c_userId : c_userId, c_name : c_name,c_email : c_email,rideSource : rideSource,rideDestination : rideDestination,rideDate : rideDate,fare : fare,carName : carName,carNumber : carNumber,r_email : r_email,r_userId : r_userId,seatsOccupied : seatsOccupied,r_name : r_name }).pipe(
      map(response => new Success<string>( response.message)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<string>(message));
      })
    )
  }

  BookHistory(c_userId : string ): Observable<ResultState<TripModel[]>> {
    const logUrl = `${this.configService.getBaseUrl()}/trip-service/trip/getTripsBycid/${c_userId}`;
    // const logUrl = `http://localhost:9090/bill/trip`;
    return this.http.post<TripModel[]>(logUrl,{}).pipe(
      map(response => new Success<TripModel[]>(response)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<TripModel[]>(message));
      })
    )
  }
  GetCities(): Observable<ResultState<Cities[]>> {
    const logUrl = `${this.configService.getBaseUrl()}/billing-service/bill/getAllCities`;
    // const logUrl = `http://localhost:9090/bill/trip`;
    return this.http.get<Cities[]>(logUrl,{}).pipe(
      map(response => new Success<Cities[]>(response)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<Cities[]>(message));
      })
    )
  }
  GetCarModels(): Observable<ResultState<CarModel[]>> {
    const logUrl = `${this.configService.getBaseUrl()}/ride-service/ride/cars/getAll`;
    // const logUrl = `http://localhost:9090/bill/trip`;
    return this.http.get<CarModel[]>(logUrl,{}).pipe(
      map(response => new Success<CarModel[]>(response)),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || error.message || 'An error occurred';
        return of(new Error<CarModel[]>(message));
      })
    )
  }
}
