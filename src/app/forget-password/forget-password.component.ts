import { Component } from '@angular/core';
import {UIState} from "../shared/UIState";
import {ToggleModeService} from "../services/toggle-mode.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
    uiState: UIState = UIState.Login;
    constructor(private toogleService : ToggleModeService) {
      this.toogleService.isSignUpMode.subscribe(isSignUp => {
        this.uiState = isSignUp;
      });
    }
  toggleMode(uiState : UIState): void {
    this.toogleService.toggleMode(uiState);
  }

  protected readonly UIState = UIState;
}
