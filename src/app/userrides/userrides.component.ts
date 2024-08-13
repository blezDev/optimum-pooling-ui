import { Component, OnInit } from "@angular/core";
import { RidesearchService } from "../services/ridesearch/ridesearch.service";
import { Ride } from "../Model/Ride";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from "@angular/common";
import { RideService } from "../services/ride/ride.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-userrides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userrides.component.html',
  styleUrls: ['./userrides.component.css']
})
export class UserridesComponent implements OnInit {
  constructor(private rideSearch: RidesearchService, private cookies: CookieService, private rideService: RideService,private router: Router) {

  }

  userRides: Ride[];

  R

  userId: number = Number(this.getCookies("userId"));

  ngOnInit(): void {

      this.rideSearch.getUserRides(this.userId).subscribe((data)=> {
        this.userRides = data;
        // console.log(this.userId)
        // console.log(this.userRides)

      } );
  }

  onDeleteRide(id: number): void {
    this.rideService.deleteRide(id).subscribe({
      next: (deletedRide) => {
        console.log('Deleted Ride:', deletedRide);
        alert(`Ride from ${deletedRide.rideSource} to ${deletedRide.rideDestination} deleted successfully`);
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
