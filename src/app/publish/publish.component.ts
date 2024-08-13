import { Component } from '@angular/core';
import { RideService } from '../services/ride/ride.service';
import { Ride } from '../Model/Ride';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})

export class PublishComponent {
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
  constructor(private rideService: RideService, private snackBar: MatSnackBar, public dialog: MatDialog, private cookies: CookieService, private router: Router) { }


  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }



  addRide(): void {
    if(this.rideForm.valid){
      this.isLoading = true;
       // Ensure rideTime is properly initialized
    if (!this.ride.rideTime || this.ride.rideTime.hours === undefined || this.ride.rideTime.minutes === undefined) {

      console.log(this.ride.rideTime);

    }

    // Convert rideDate and rideTime to the correct format before sending
    const formattedRide: any = {
      ...this.ride,
      rideDate: this.formatDateForBackend(this.ride.rideDate),
      // rideTime: this.formatTimeFromDate(new Date(this.ride.rideDate.setHours(this.ride.rideTime.hours, this.ride.rideTime.minutes)))
    };

    console.log(formattedRide)
    this.rideService.addRide(formattedRide).subscribe(
      response => {

        this.showMessage("Ride added successfully");
        this.router.navigate(['/user-rides'], {replaceUrl: false});

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
