import {Component} from '@angular/core';
import {ToggleModeService} from "../services/toggle-mode.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {VerificationComponent} from "../verification/verification.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0, transform: 'translateY(20px)'})),
      transition('void => *', [
        animate("600ms ease-ou", keyframes([
          style({opacity: 0, transform: 'translateY(20px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("600ms ease-ou", keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-20px)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isSignUpMode: boolean = false;

  constructor(private toggleModeService: ToggleModeService, public dialog: MatDialog) {
    this.toggleModeService.isSignUpMode.subscribe(mode => {
      this.isSignUpMode = mode;
    });
  }

  toggleMode() {
    this.toggleModeService.toggleMode();
  }

  login() {

  }

  loginButton() {

    // Open the OTP Verification Dialog
    const dialogRef = this.dialog.open(VerificationComponent, {
      width: 'auto', // Adjust the width as needed
      // You can also pass data to the dialog if needed
      data: {email: this.email} // Example data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle the result from the dialog here
    });
  }

  loginWithGoogle() {
    // Placeholder for Google sign-in functionality
    console.log('Sign in with Google');
  }
}
