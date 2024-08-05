import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseURL: string = "http://localhost:8080";

  getBaseUrl(){
    return this.baseURL;
  }



  constructor() { }
}
