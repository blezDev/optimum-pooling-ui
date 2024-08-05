import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UIState} from "../shared/UIState";

@Injectable({
  providedIn: 'root'
})
export class ToggleModeService {
  private modeSubject = new BehaviorSubject<UIState>(UIState.Login);
  isSignUpMode = this.modeSubject.asObservable();
  toggleMode(uiState: UIState) {
    this.modeSubject.next(uiState);
  }
}
