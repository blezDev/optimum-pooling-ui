import { Component, OnInit } from "@angular/core";
import { RidesearchService } from "../services/ridesearch/ridesearch.service";
import { Ride } from "../Model/Ride";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-userrides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userrides.component.html',
  styleUrls: ['./userrides.component.css']
})
export class UserridesComponent implements OnInit {
  constructor(private rideSearch: RidesearchService, private cookies: CookieService) {

  }

  userRides: Ride[];

  userId: number = Number(this.getCookies("userId"));

  ngOnInit(): void {
      this.rideSearch.getUserRides(this.userId).subscribe((data)=> {
        this.userRides = data;
        console.log(this.userId)
        console.log(this.userRides)

      } );
  }

  setCookies(key : string, value : string) {
    this.cookies.set(key, value);
  }
  getCookies(key : string) {
    return this.cookies.get(key);
  }
  

}
