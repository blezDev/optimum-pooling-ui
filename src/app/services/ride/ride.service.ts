import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/Model/Ride';
import { ConfigService } from '../configs/config.service';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  // private baseUrl = `${this.configService.getBaseUrl()}/ride-service/ride`;
  private baseUrl = "http://localhost:8091/ride";


  constructor(private http: HttpClient,private configService: ConfigService) { }

  // Method to get a ride by ID
  getRideById(id: number): Observable<Ride> {
    return this.http.get<Ride>(`${this.baseUrl}/${id}`);
  }

  // Method to add a new ride
  addRide(ride: Ride): Observable<Ride> {
    return this.http.post<Ride>(`${this.baseUrl}/add`, ride);
  }


  // Method to update an existing ride
  updateRide(ride: Ride): Observable<Ride> {
    return this.http.put<Ride>(`${this.baseUrl}/update`, ride);
  }

  // Method to search for rides
  searchRides(searchRequest: any): Observable<Ride[]> {
    return this.http.post<Ride[]>(`${this.baseUrl}/search`, searchRequest);
  }
}
