import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ride} from '../Model/Ride';
import {RideSearch} from '../Model/RideSearch';
import {RidesearchService} from '../services/ridesearch/ridesearch.service';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RideService} from "../services/ride/ride.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Billing} from '../billing/billling.model';
import {MatDialog} from "@angular/material/dialog";
import {ApiServiceService} from "../services/remote/api-service.service";
import {Success} from "../shared/ResultState";
import {FetchModel} from "../billing/FetchModel";
import {DatePipe} from '@angular/common';
import {DateAdapter} from "@angular/material/core";
import {VerificationComponent} from "../verification/verification.component";
import {BillingComponent} from "../billing/billing.component";
import {auto} from "@popperjs/core";
import {map, Observable, startWith} from "rxjs";
import {Cities} from "./Cities";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  minDate = new Date();  // Ensures the date picker defaults to today's date or later
  passengerCount: string = "";
  showDropdownLang: boolean = false;
  toggleDropdownLang(): void {
    this.showDropdownLang = !this.showDropdownLang;
  }

  currentLanguage: string = 'en'; // Default to 'en' initially
  constructor(private cookieService: CookieService,
              private router: Router,
              private rideSearchService: RidesearchService,
              private socialAuthService: SocialAuthService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private apiService: ApiServiceService,
              public dialog: MatDialog,
              private cookies: CookieService,
              private dateAdapter: DateAdapter<Date>,
  ) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.dateAdapter.setLocale('en-GB');

    this.translate.setDefaultLang('en');
    const cookieLanguage = this.getCookies('language');
    this.currentLanguage = (cookieLanguage === 'en' || cookieLanguage === 'hi') ? cookieLanguage : 'en';
    this.translate.use(this.currentLanguage);
  }

  isLoading: boolean = false;

  switchLanguage(language: string): void {
    if (language === 'en' || language === 'hi') {
      this.setCookies('language', language);
      this.translate.use(language);
      this.currentLanguage = language;
    }
    this.showDropdownLang = false; // Close dropdown after selection
  }


  setCookies(key: string, value: string) {
    this.cookies.set(key, value);
  }

  getCookies(key: string) {
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


  billGenerate(trip: Ride) {
    this.isLoading = true;


    const {rideDestination, rideSource, availableSeats} = this.ride.value;
    const name = this.getCookies("firstName") + " " + this.getCookies("lastName");
    this.apiService.TripBill(rideSource, rideDestination, Number(availableSeats), Number(trip.fare), name).subscribe(result => {
      if (result instanceof Success) {
        this.isLoading = false;
        console.log(Number(trip.fare));
        const data = result.data as FetchModel;
        console.log(data);
        const sampleBilling: any = {
          name: name,
          fare: "₹" + result.data.data.fare,
          totalCharges: "₹" + result.data.data.totalCharges,
          numberOfPassengers: result.data.data.numberOfPassengers,
          startDestination: trip.rideSource,
          endDestination: trip.rideDestination,
          carModel: trip.carName,
          carNumber: trip.carNum,
          c_userId: this.getCookies("userId"),
          c_email: this.getCookies("email"),
          rideDate: String(trip.rideDate),
          r_email: trip.r_email,
          r_userId: trip.rideId.toString(),
          r_name: trip.r_name
        };

        const dialogRef = this.dialog.open(BillingComponent, {
          width: 'auto',
          data: {...sampleBilling}  // Passing data to the BillingComponent
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.refreshRides(); // Call refresh method here
        });
      } else {
        this.isLoading = false;

        this.showMessage(result.message ?? "Failed to show data in.");
      }
    });

  }


  refreshRides(){
    const rideSearch: RideSearch = {
      rideSource: this.ride.get('rideSource')?.value,
      rideDestination: this.ride.get('rideDestination')?.value,
      rideDate: this.formatDateForBackend(this.ride.get('rideDate')?.value),
      availableSeats: this.ride.get('availableSeats')?.value,
    };

    this.rideSearchService.searchRides(rideSearch).subscribe(
      (data: Ride[]) => {
        this.isLoading = false;
        this.rides = data;
        if (data.length <= 0) {
          this.showMessage("No Trip Available.");
        }
        this.errorMessage = null;
        console.log(this.rides);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while searching for rides.';
        console.error(error);
      }
    );
  }

  navigateToTripHistory() {
    this.router.navigate(['/trip-history'], {replaceUrl: false});
  }

  navigateToUserRides() {
    this.router.navigate(['/user-rides'], {replaceUrl: false});
  }

  start_cities: string[];
  end_cities: string[];

  filteredSourceCities: Observable<string[]>;
  filteredDestinationCities: Observable<string[]>;

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.start_cities.filter(city => city.toLowerCase().includes(filterValue));
  }


  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.end_cities.filter(city => city.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.GetCities().subscribe(result => {
      if (result instanceof Success) {
        this.isLoading = false;
        const data = result.data as Cities[];
        console.log(data);
        this.start_cities = [...new Set(data.map((city) => {
          return city.startCity
        }))];
        this.end_cities = [...new Set(data.map((city) => {
          return city.endCity
        }))];
      } else {
        this.isLoading = false;
        console.log("No data");
      }

      this.filteredSourceCities = this.ride.get('rideSource').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter1(value || ''))
        );
      this.filteredDestinationCities = this.ride.get('rideDestination').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter2(value || ''))
        );

    });


  }


  onSearch() {


    if (this.ride.valid) {

      const source = this.ride.get('rideSource')?.value;
      if (source != null && !this.start_cities.includes(source)) {
        this.showMessage("Please Enter a city from the list for source.");
        return;
      }
      const end = this.ride.get('rideDestination')?.value;
      if (end != null && !this.end_cities.includes(end)) {
        this.showMessage("Please enter a city from the list for destination.");
        return;
      }


      console.log(source + "    " + end);
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
          if (data.length <= 0) {
            this.showMessage("No Trip Available.");
          }
          this.errorMessage = null;
          console.log(this.rides)
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred while searching for rides.';
          console.error(error);
        }
      );

    } else {
      const passenger = this.ride.get('availableSeats')?.value;
      if (passenger == null || passenger.length <= 0 || passenger) {
        this.showMessage("Please valid passengers number.");
      }
      this.showMessage("Please fill all the required fields.")
    }
  }



  private formatDateForBackend(date: Date): string {
    // Format date to 'dd-MM-yyyy'
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }


  protected readonly Date = Date;

}
