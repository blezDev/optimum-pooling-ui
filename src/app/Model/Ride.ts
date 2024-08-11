import { Time } from "@angular/common";

export interface Ride {
    rideId: number;
    rideSource: string;
    rideDestination: string;
    rideDate: Date;  // ISO date format
    rideTime: Time;  // ISO time format
    carName: string;
    carNum: string;
    availableSeats: number;
}
  