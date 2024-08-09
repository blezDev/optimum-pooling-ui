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
  


  constructor() { }

  ngOnInit(): void {

  }
  billing = {
    name: 'John Doe',
    fare: '50.00',
    commissions: '5.00',
    totalCharges: '55.00',
    numberOfPassengers: '3',
    startDestination: 'New York',
    endDestination: 'Boston',
    carModel: 'Toyota Camry',
    carNumber: 'XYZ 1234'
  };

 
}
