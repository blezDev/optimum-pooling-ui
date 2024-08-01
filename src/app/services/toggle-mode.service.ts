import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleModeService {
  private modeSubject = new BehaviorSubject<boolean>(false);
  isSignUpMode = this.modeSubject.asObservable();
  toggleMode() {
    this.modeSubject.next(!this.modeSubject.value);
  }
}
