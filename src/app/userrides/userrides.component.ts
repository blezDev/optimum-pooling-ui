import { Component, OnInit } from "@angular/core";
import { RidesearchService } from "../services/ridesearch/ridesearch.service";
import { Ride } from "../Model/Ride";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from "@angular/common";
import { RideService } from "../services/ride/ride.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import {LoadingComponent} from "../shared/loading/loading.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-userrides',
  standalone: true,
  imports: [CommonModule, LoadingComponent, TranslateModule],
  templateUrl: './userrides.component.html',
  styleUrls: ['./userrides.component.css']
})
export class UserridesComponent implements OnInit {
  constructor(private rideSearch: RidesearchService, private cookies: CookieService, private rideService: RideService,private router: Router, private snackBar: MatSnackBar) {

  }

  userRides: Ride[];


  isLoading :boolean = false;
  userId: number = Number(this.getCookies("userId"));

  ngOnInit(): void {
      this.isLoading = true;
      this.rideSearch.getUserRides(this.userId).subscribe((data)=> {
        this.userRides = data;
        this.isLoading = false;
        // console.log(this.userId)
        // console.log(this.userRides)

      } );
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  onDeleteRide(id: number): void {
    this.rideService.deleteRide(id).subscribe({
      next: (deletedRide) => {
        console.log('Deleted Ride:', deletedRide);
        this.showMessage("Ride deleted successfully");


        window.location.reload(); // Or this.router.navigate([this.router.url]);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting ride:', error);
        alert(`Failed to delete ride. Status: ${error.status}, Message: ${error.message}`);
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
