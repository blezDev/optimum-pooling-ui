import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Billing } from './billling.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  billingData: any = {};

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.billingData = {
        name: params['name'],
        fare: params['fare'],
        totalCharges: params['totalCharges'],
        numberOfPassengers: params['numberOfPassengers'],
        startDestination: params['startDestination'],
        endDestination: params['endDestination'],
        carModel: params['carModel'],
        carNumber: params['carNumber']
      };
      console.log('Billing Data:', this.billingData);
  });
}

 
}