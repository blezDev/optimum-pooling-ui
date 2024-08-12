import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../services/remote/api-service.service';

@Component({
  selector: 'app-trip-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {
  trips: any[] = [];

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
   
  }


}
