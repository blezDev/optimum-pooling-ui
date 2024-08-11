import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from 'src/app/Model/Ride';
import { RideSearch } from 'src/app/Model/RideSearch';
import { ConfigService } from '../configs/config.service';

@Injectable({
  providedIn: 'root'
})
export class RidesearchService {

private baseUrl: string = "http://localhost:8091/ride";

 // private baseUrl = `${this.configService.getBaseUrl()}/ride-service/ride`;

  constructor(private http: HttpClient,private configService: ConfigService) { }

  searchRides(rideSearch: RideSearch): Observable<Ride[]> {
    return this.http.post<Ride[]>(`${this.baseUrl}/search`, rideSearch);
  }

}
