import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseURL: string = "http://localhost:8081";

  getBaseUrl(){
    return this.baseURL;
  }



  constructor() { }
}
