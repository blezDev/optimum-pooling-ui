import {Component, OnInit} from '@angular/core';
import {ToggleModeService} from "../services/toggle-mode.service";
import {UIState} from "../shared/UIState";
import {VerificationComponent} from "../verification/verification.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultState, Success} from "../shared/ResultState";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiServiceService} from "../services/remote/api-service.service";
import {Router} from "@angular/router";


import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {CookieService} from "ngx-cookie-service";
import {emailDomainValidator} from "../shared/EmailValidator";

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
              private cookies: CookieService,
  ) {

  }

  setCookies(key: string, value: string) {
    this.cookies.set(key, value);
  }

  // ngOnInit(): void {
  //
  //   this.socialAuthService.authState.subscribe((user) => {
  //     if (user != null){
  //       this.isLoading = true;
  //       this.apiService.GoogleLogin(user.firstName,user.lastName,user.email).subscribe(result => {
  //         if (result instanceof Success) {
  //           this.isLoading = false;
  //           console.log(result.data)
  //           this.setCookies("email", user.email);
  //           this.setCookies("firstName", user.firstName);
  //           this.setCookies("lastName", user.lastName);
  //           this.setCookies("userId", result?.data);
  //           this.showMessage(result.data?.message ?? "Successfully logged in");
  //           this.router.navigateByUrl('/home',{replaceUrl: true});
  //         }else{
  //           this.isLoading = false;
  //           this.showMessage(result.message ?? "Failed to log in");
  //         }
  //       });
  //     }else{
  //       this.isLoading = false;
  //     }
  //     //perform further logics
  //   });
  //
  // }


  isLoading: boolean = false;
  signup = new FormGroup({
    firstName: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]),
    lastName: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    email: new FormControl(null, [Validators.required, Validators.email,emailDomainValidator()]),
    password: new FormControl(null, [Validators.required])
  });
  state: ResultState<string> | null = null;

  onSubmit() {
    if (this.signup.valid) {
      this.isLoading = true;
      const {email} = this.signup.value;
      this.apiService.OTPEvent(email!!).subscribe(result => {
        if (result instanceof Success) {
          this.isLoading = false;
          this.VerifyScreen(email!!);


        } else {
          this.isLoading = false;
          this.showMessage(result.message ?? "Error in OTP!!");
        }
      })

    } else {
      const controls = this.signup.controls;
      const formData = this.signup.value;
      if ((formData.firstName === null || formData.firstName === "") && (formData.lastName === null || formData.firstName === "") && (formData.email === null || formData.email === "") && (formData.password === null || formData.password === "") && (formData.phoneNumber === null || formData.phoneNumber === "")) {
        this.showMessage("Please fill all fields.");
      }


      if (controls['firstName'].invalid) {
        if (controls['firstName'].errors?.['required']) {
          this.showMessage("First Name is required.");
        } else if (controls['firstName'].errors?.['pattern']) {
          this.showMessage("Enter a valid First Name.");
        }
      }

      if (controls['lastName'].invalid) {
        if (controls['lastName'].errors?.['required']) {
          this.showMessage("Last Name is required.");
        } else if (controls['lastName'].errors?.['pattern']) {
          this.showMessage("Enter a valid Last Name.");
        }
      }

      if (controls['email'].invalid) {
        if (controls['email'].errors?.['required']) {
          this.showMessage("Email is required.");
        } else if (controls['email'].errors?.['email']) {
          this.showMessage("Enter a valid email.");
        }
      }

      if (controls['password'].invalid) {
        if (controls['password'].errors?.['required']) {
          this.showMessage("Password is required.");
        }
      }

      if (controls['phoneNumber'].invalid) {
        if (controls['phoneNumber'].errors?.['required']) {
          this.showMessage("Phone Number is required.");
        } else if (controls['phoneNumber'].errors?.['pattern']) {
          this.showMessage("Enter a valid Phone Number (10 digits).");
        }
      }


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
    dialogRef.afterClosed().subscribe((isVerified: boolean = false) => {
      if (isVerified) {
        this.apiService.SignUpEvent(firstName, lastName, email, password, phoneNumber).subscribe(result => {
          this.state = result;
          if (result instanceof Success) {
            console.log(result)
            this.showMessage(result.data ?? "Successfully sign up");
            this.toggleModeService.toggleMode(UIState.Login)

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
