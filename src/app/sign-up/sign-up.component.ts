import {Component, ViewChild} from '@angular/core';
import {ToggleModeService} from "../services/toggle-mode.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private toggleModeService: ToggleModeService) {}


  toggleToLogin() {
    this.toggleModeService.toggleMode();
  }
}
