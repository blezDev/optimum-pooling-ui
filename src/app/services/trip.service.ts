import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl = 'http://localhost:8080/trips';

  constructor(private http: HttpClient) {}

  createTrip(trip: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, trip)
      .pipe(catchError(this.handleError));
  }

  getTripsByRideId(rideId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ride/${rideId}`)
      .pipe(catchError(this.handleError));
  }

  getTripsByCustomerId(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customer/${customerId}`)
      .pipe(catchError(this.handleError));
  }

  getTripByRideIdAndCustomerId(rideId: number, customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ride/${rideId}/customer/${customerId}`)
      .pipe(catchError(this.handleError));
  }

  deleteTripsByRideId(rideId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ride/${rideId}`)
      .pipe(catchError(this.handleError));
  }

  deleteTripByRideIdAndCustomerId(rideId: number, customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ride/${rideId}/customer/${customerId}`)
      .pipe(catchError(this.handleError));
  }

  getCustomerDetails(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/customer-details/${customerId}`)
      .pipe(catchError(this.handleError));
  }

  getRideDetails(rideId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ride-details/${rideId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
