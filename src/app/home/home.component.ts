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
import {MatDialog} from "@angular/material/dialog";
import {ApiServiceService} from "../services/remote/api-service.service";
import {Success} from "../shared/ResultState";
import {FetchModel} from "../billing/FetchModel";
import { DatePipe } from '@angular/common';
import {DateAdapter} from "@angular/material/core";
import {VerificationComponent} from "../verification/verification.component";
import {BillingComponent} from "../billing/billing.component";
import {auto} from "@popperjs/core";

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
              private apiService: ApiServiceService,
              public dialog: MatDialog,
              private cookies: CookieService,
              private dateAdapter: DateAdapter<Date>,
              ) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.dateAdapter.setLocale('en-GB');
  }
  isLoading :boolean = false;
  setCookies(key : string, value : string) {
    this.cookies.set(key, value);
  }
  getCookies(key : string) {
    return this.cookies.get(key);
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
    availableSeats: new FormControl(null, [Validators.required]),
  });


billGenerate(trip : Ride){
  this.isLoading = true;


  const {rideDestination,rideSource,availableSeats} = this.ride.value;
  const name = this.getCookies("firstName") + " " + this.getCookies("lastName");
 this.apiService.TripBill(rideSource,rideDestination,Number(availableSeats),14,name).subscribe(result=>{
   if (result instanceof Success) {
     this.isLoading = false;

    const data = result.data as FetchModel;
    console.log(data);
     const sampleBilling: any = {
       name: name,
       fare: "₹"+result.data.data.fare,
       totalCharges: "₹"+result.data.data.totalCharges,
       numberOfPassengers: result.data.data.numberOfPassengers,
       startDestination: trip.rideSource,
       endDestination: trip.rideDestination,
       carModel: trip.carName,
       carNumber: trip.carNum,
       c_userId : this.getCookies("userId"),
       c_email : this.getCookies("email"),
       rideDate : String(trip.rideDate),
       r_email : trip.r_email,
       r_userId : trip.rideId.toString(),
       r_name : trip.r_name
     };

     const dialogRef = this.dialog.open(BillingComponent, {
       width: 'auto',
       data: { ...sampleBilling }  // Passing data to the BillingComponent
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed', result);
     });
   }else{
     this.isLoading = false;

     this.showMessage(result.message ?? "Failed to show data in.");
   }
 });

}

navigateToTripHistory(){
  this.router.navigate(['/trip-history'], {replaceUrl: false});
}

navigateToUserRides(){
  this.router.navigate(['/user-rides'], {replaceUrl: false});
}


  onSearch() {

    if (this.ride.valid){
      this.isLoading = true;
      const rideSearch: RideSearch = {
        rideSource: this.ride.get('rideSource')?.value,
        rideDestination: this.ride.get('rideDestination')?.value,
        rideDate: this.formatDateForBackend(this.ride.get('rideDate')?.value),
        availableSeats: this.ride.get('availableSeats')?.value,
      };
      console.log(rideSearch);

      this.rideSearchService.searchRides(rideSearch).subscribe(
        (data: Ride[]) => {
          this.isLoading = false;
          this.rides = data;
          this.errorMessage = null;
          console.log(this.rides)
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred while searching for rides.';
          console.error(error);
        }
      );

    }else{
      this.showMessage("Please fill all the required fields.")
    }
  }

  shou
  private formatDateForBackend(date: Date): string {
    // Format date to 'dd-MM-yyyy'
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }


  protected readonly Date = Date;
}
