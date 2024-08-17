import {Component, OnInit} from '@angular/core';
import { RideService } from '../services/ride/ride.service';
import { Ride } from '../Model/Ride';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {map, Observable, startWith} from "rxjs";


import {Success} from "../shared/ResultState";
import {Cities} from "../home/Cities";
import {ApiServiceService} from "../services/remote/api-service.service";
import {CarModel} from "./CarModels";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})

export class PublishComponent implements OnInit{
  isLoading :boolean = false;
  ride: Ride = {
    rideId: 0,
    rideSource: '',
    rideDestination: '',
    rideDate: new Date(),
    rideTime: { hours: new Date().getHours(), minutes: new Date().getMinutes() },
    carName: '',
    carNum: '',
    availableSeats: null,
    publisherId: Number(this.getCookies('userId')),
    r_email : this.getCookies("email"),
    r_name : this.getCookies("firstName") + " " + this.getCookies("lastName"),
    fare : ''
  };

  rideForm = new FormGroup({
    rideSource: new FormControl('', [Validators.required]),
    rideDestination: new FormControl('', [Validators.required]),
    rideDate: new FormControl(new Date(), [Validators.required]),
    rideTime: new FormControl({hours: new Date().getHours(), minutes: new Date().getMinutes()}, [Validators.required]),
    carName: new FormControl('', [Validators.required]),
    carNum: new FormControl('', [Validators.required]),
    availableSeats: new FormControl(0, [Validators.required]),
    r_email: new FormControl(''),
    r_name: new FormControl('')
  });
  constructor(private rideService: RideService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private cookies: CookieService,
              private router: Router,
              private apiService : ApiServiceService) { }


  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }


  start_cities: string[];
  end_cities: string[];


  carModels : CarModel[];
  filteredSourceCities: Observable<string[]>;
  filteredDestinationCities: Observable<string[]>;
  filteredCarModels: Observable<CarModel[]>;

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.start_cities.filter(city => city.toLowerCase().includes(filterValue));
  }


  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.end_cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  private _filter3(value: string): CarModel[] {
    const filterValue = value.toLowerCase();
    return this.carModels.filter(car => car.carModel.toLowerCase().includes(filterValue));
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

      this.filteredSourceCities = this.rideForm.get('rideSource').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter1(value || ''))
        );
      this.filteredDestinationCities = this.rideForm.get('rideDestination').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter2(value || ''))
        );

    });


    this.apiService.GetCarModels().subscribe(result => {
      if (result instanceof Success) {
        const data = result.data as CarModel[];
        const uniqueCarModels = data
          .map(car => car.carModel) // Get an array of carModel strings
          .filter((value, index, self) => self.indexOf(value) === index) // Filter unique values
          .map(carModel => data.find(car => car.carModel === carModel)); // Map back to CarModel objects

        this.carModels =  uniqueCarModels
      }

      console.log(this.carModels);

      this.filteredCarModels = this.rideForm.get('carName').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter3(value || ''))
        );
    });
    console.log(this.filteredCarModels);

  }










  addRide(): void {
    if(this.rideForm.valid){
      this.isLoading = true;
       // Ensure rideTime is properly initialized
    if (!this.ride.rideTime || this.ride.rideTime.hours === undefined || this.ride.rideTime.minutes === undefined) {

      console.log(this.ride.rideTime);

    }


    let price = this.carModels.filter((car)=> car.carModel ===this.rideForm.get("carName").value);
    console.log(price);
   let amount = price[0].farePerKm? price[0].farePerKm : 13;
    // Convert rideDate and rideTime to the correct format before sending
    const formattedRide: any = {
      ...this.ride,
      rideDate: this.formatDateForBackend(this.ride.rideDate),
      fare : String(amount),
      carName : this.rideForm.get('carName').value,
      // rideTime: this.formatTimeFromDate(new Date(this.ride.rideDate.setHours(this.ride.rideTime.hours, this.ride.rideTime.minutes)))
    };

    console.log(formattedRide)
    this.rideService.addRide(formattedRide).subscribe(
      () => {

        this.showMessage("Ride added successfully");
        this.router.navigate(['/user-rides'], {replaceUrl:false});

        console.log(formattedRide)
        this.isLoading = false;


      },
      error => {
        this.isLoading = false;
        this.showMessage('Error adding ride')
      }

    );

    }else{
        this.showMessage("Please fill all fields.");
    }
  }

  private formatDateForBackend(date: Date): string {
    // Format date to 'dd-MM-yyyy'
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }

  setCookies(key : string, value : string) {
    this.cookies.set(key, value);
  }
  getCookies(key : string) {
    return this.cookies.get(key);
  }

  // private formatTimeFromDate(date: Date): string {
  //   // Extract hours and minutes from the Date object
  //   const hours = date.getHours().toString().padStart(2, '0');
  //   const minutes = date.getMinutes().toString().padStart(2, '0');

  //   // Format time to 'HH:mm'
  //   return `${hours}:${minutes}`;
  // }
}
