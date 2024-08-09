import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  minDate = new Date();  // Ensures the date picker defaults to today's date or later
  passengerCount: string = "";
  constructor(private cookieService: CookieService,private router: Router) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }


  showDropdown = false;
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    // Clear cookies or local storage
    this.cookieService.deleteAll();
    // Possibly redirect user or refresh the authentication status
    this.showDropdown = false;
    this.router.navigate(['/login'],{replaceUrl : true});
    // Redirect or perform additional cleanup
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
