import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import { Ride } from '../Model/Ride';
import { RideSearch } from '../Model/RideSearch';
import { RidesearchService } from '../services/ridesearch/ridesearch.service';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {RideService} from "../services/ride/ride.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Billing } from '../billing/billling.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  minDate = new Date();  // Ensures the date picker defaults to today's date or later
  passengerCount: string = "";
  constructor(private cookieService: CookieService,
              private router: Router,
              private rideSearchService: RidesearchService,
              private socialAuthService: SocialAuthService,
              private snackBar: MatSnackBar,
              ) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }



  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
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
    this.socialAuthService.signOut()

    this.router.navigate(['/login'], {replaceUrl: true}).then(r => {
      this.showMessage("Logged out.");
    });
    // Redirect or perform additional cleanup
  }


  rides: Ride[] = [];

  errorMessage: string | null = null;

  ride = new FormGroup({
    rideSource: new FormControl('', [Validators.required]),
    rideDestination: new FormControl('', [Validators.required]),
    rideDate: new FormControl(new Date(), [Validators.required]),
    availableSeats: new FormControl(0, [Validators.required]),
  });


billGenerate(){
  const sampleBilling: Billing = {
    name: "John Doe",
    fare: "$50.00",
    totalCharges: "₹250.00",
    numberOfPassengers: "2",
    startDestination: "123 Main St",
    endDestination: "456 Elm St",
    carModel: "Toyota Camry",
    carNumber: "XYZ 1234"
};
this.router.navigate(['/bill'], { queryParams: sampleBilling });
}

  onSearch() {



    const rideSearch: RideSearch = {
      rideSource: this.ride.get('rideSource')?.value,
      rideDestination: this.ride.get('rideDestination')?.value,
      rideDate: this.formatDateForBackend(this.ride.get('rideDate')?.value),
      availableSeats: this.ride.get('availableSeats')?.value,
    };
    console.log(rideSearch);
    this.rideSearchService.searchRides(rideSearch).subscribe(
      (data: Ride[]) => {
        this.rides = data;
        this.errorMessage = null;
        console.log(this.rides)
        console.log(rideSearch.rideDate)
      },
      (error) => {
        this.errorMessage = 'An error occurred while searching for rides.';
        console.error(error);
      }
    );
  }

  private formatDateForBackend(date: Date): string {
    // Format date to 'dd-MM-yyyy'
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }


  protected readonly Date = Date;
}
