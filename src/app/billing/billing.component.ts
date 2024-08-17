import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Billing} from './billling.model';
import {FetchModel} from "./FetchModel";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiServiceService} from "../services/remote/api-service.service";
import {Success} from "../shared/ResultState";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoadingComponent} from "../shared/loading/loading.component";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  standalone: true,
  imports: [
    LoadingComponent,
    NgIf,
    TranslateModule
  ],
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  isLoading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public billingData: any, private router: Router, private route: ActivatedRoute, private apiService: ApiServiceService, private snackBar: MatSnackBar, public dialog: MatDialog,) {
  }

  ngOnInit(): void {

    /*    this.route.queryParams.subscribe(params => {
          this.billingData = {
            name: params['name'],
            fare: params['fare'],
            totalCharges: params['totalCharges'],
            numberOfPassengers: params['numberOfPassengers'],
            startDestination: params['startDestination'],
            endDestination: params['endDestination'],
             carModel : params['carModel'],
            carNumber: params['carNumber']
          };
          console.log('Billing Data:', this.billingData);
      });*/
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  Book() {
    this.isLoading = true;
    console.log(this.billingData.c_userId, this.billingData.name, this.billingData.c_email, this.billingData.startDestination, this.billingData.endDestination, this.billingData.rideDate, this.billingData.fare, this.billingData.carModel, this.billingData.carNumber, this.billingData.r_email, this.billingData.r_userId, this.billingData.numberOfPassengers);
    this.apiService.BookTrip(
      this.billingData.c_userId, this.billingData.name, this.billingData.c_email, this.billingData.startDestination, this.billingData.endDestination, this.billingData.rideDate, this.billingData.fare, this.billingData.carModel, this.billingData.carNumber, this.billingData.r_email, this.billingData.r_userId, this.billingData.numberOfPassengers, this.billingData.r_name
    ).subscribe(result => {
      if (result instanceof Success) {
        this.isLoading = false;
        this.showMessage("Trip Booked.");
        this.dialog.closeAll()
      } else {
        //TODO
        this.isLoading = false;
        this.showMessage("Trip Failed.");
        this.dialog.closeAll()
      }
    });
  }
}
