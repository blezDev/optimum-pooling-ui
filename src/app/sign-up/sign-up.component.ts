import {Component, Inject, ViewChild} from '@angular/core';
import {ToggleModeService} from "../services/toggle-mode.service";
import {UIState} from "../shared/UIState";
import {VerificationComponent} from "../verification/verification.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultState, Success} from "../shared/ResultState";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiServiceService} from "../services/remote/api-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private toggleModeService: ToggleModeService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private apiService: ApiServiceService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: { email: string }) {

  }


  signup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  state: ResultState<string> | null = null;

  onSubmit() {
    if (this.signup.valid) {
      const {firstName, lastName, phoneNumber, email, password} = this.signup.value;
      this.apiService.OTPEvent(email!!).subscribe(result => {
        if (result instanceof Success) {
          this.VerifyScreen(email!!);


        } else {
          this.showMessage(result.message ?? "Error in OTP!!");
        }
      })

    } else {
      this.showMessage("Please fill the required fields.");
    }
  }


  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  VerifyScreen(email: string) {
    // Open the OTP Verification Dialog
    const dialogRef = this.dialog.open(VerificationComponent, {
      width: 'auto', // Adjust the width as needed
      // You can also pass data to the dialog if needed
      data: {email: email} // Example data
    });

    const {firstName, lastName, phoneNumber, password} = this.signup.value;
    dialogRef.afterClosed().subscribe((isVerified: boolean) => {
      if (isVerified) {
        this.apiService.SignUpEvent(firstName!!,lastName!!,phoneNumber!!, email!!, password!!).subscribe(result => {
          this.state = result;
          if (result instanceof Success) {
            console.log(result)
            this.showMessage(result.data ?? "Successfully sign up");
            this.router.navigateByUrl('/home',{replaceUrl: true});
          } else {
            console.log(result)
            this.showMessage(result.message ?? "Failed to sign in");
          }
        })
      } else {
        console.log('OTP verification failed or was canceled');
        // Handle failure or cancellation
      }

    });
  }


  toggleToLogin(uiState: UIState): void {
    this.toggleModeService.toggleMode(uiState);
  }

  protected readonly UIState = UIState;
}
