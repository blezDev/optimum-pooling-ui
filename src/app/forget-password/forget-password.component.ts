import { Component } from '@angular/core';
import {UIState} from "../shared/UIState";
import {ToggleModeService} from "../services/toggle-mode.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultState, Success } from '../shared/ResultState';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../services/remote/api-service.service';
import { Router } from '@angular/router';
import { VerificationComponent } from '../verification/verification.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
    uiState: UIState = UIState.Login;

    forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    state: ResultState<string> | null = null;
    



    constructor(private toogleService : ToggleModeService,
      public dialog: MatDialog,
      private snackBar: MatSnackBar,
      private apiService: ApiServiceService,
      private router: Router, ) {
      this.toogleService.isSignUpMode.subscribe(isSignUp => {
        this.uiState = isSignUp;
      });
    }

    onSubmit(){

      if (this.forgotPasswordForm.valid) {
        const {email} = this.forgotPasswordForm.value;
        this.apiService.OTPEvent(email!!).subscribe(result => {
          if (result instanceof Success) {
            this.VerifyScreen(email!!);
          } else {
            this.showMessage(result.message ?? "Error in OTP!!");
          }
        })
      }else{
        this.showMessage("Please enter your email address.");
      }
    }

    VerifyScreen(email: string) {
      // Open the OTP Verification Dialog
      const dialogRef = this.dialog.open(VerificationComponent, {
        width: 'auto', // Adjust the width as needed
        // You can also pass data to the dialog if needed
        data: {email: email} // Example data
      });
  
     
      dialogRef.afterClosed().subscribe((isVerified: boolean =false) => {
        if (isVerified) {
          this.router.navigateByUrl('/change-password',{replaceUrl: true,state: { email: email }});
        } else {
          console.log('OTP verification failed or was canceled');
          this.showMessage('OTP verification failed or was canceled');
          // Handle failure or cancellation
        }
  
      });
    }

  toggleMode(uiState : UIState): void {
    this.toogleService.toggleMode(uiState);
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  protected readonly UIState = UIState;
}
