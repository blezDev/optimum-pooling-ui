import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../services/remote/api-service.service';
import {CookieService} from "ngx-cookie-service";
import {Success} from "../shared/ResultState";

@Component({
  selector: 'app-trip-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {
  trips: any[] = [];

  constructor(private apiService: ApiServiceService,    private cookies: CookieService,) { }

  ngOnInit(): void {
   this.apiService.BookHistory(this.getCookies("userId")).subscribe(result=>{
     if (result instanceof Success){
       this.trips = result.data;
     }else{

     }
   });
  }
  setCookies(key : string, value : string) {
    this.cookies.set(key, value);
  }
  getCookies(key : string) {
    return this.cookies.get(key);
  }

}
