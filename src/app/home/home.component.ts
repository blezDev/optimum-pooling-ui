import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  minDate = new Date();  // Ensures the date picker defaults to today's date or later
  passengerCount: string = "";
  constructor() {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  trips = [
    {
      departure: '10:00 AM | NEW YORK',
      duration: '4 hours',
      arrival: '02:00 PM | TEXAS',
    },
    {
      departure: '10:00 AM | PUNE',
      duration: '4 hours',
      arrival: '02:00 PM | MUMBAI',
    },
    {
      departure: '10:00 AM | PUNE',
      duration: '4 hours',
      arrival: '02:00 PM | NASIK',
    },
    {
      departure: '10:00 AM | MUMBAI',
      duration: '4 hours',
      arrival: '02:00 PM | THANE',
    },
    {
      departure: '10:00 AM | LOS ANGELES',
      duration: '4 hours',
      arrival: '02:00 PM | CHICAGO',
    }
  ];
}
