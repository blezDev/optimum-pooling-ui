import {Component, EventEmitter, Inject, Input, Output, SimpleChanges} from '@angular/core';
import {NgxOtpInputComponent, NgxOtpInputComponentOptions, NgxOtpStatus} from 'ngx-otp-input';
import {FormArray, FormControl, Validators} from "@angular/forms";
import {defaultOptions} from "ngx-otp-input/lib/default.config";
import {OtpValueChangeEvent} from "ngx-otp-input/lib/directives/inputNavigations.directive";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiServiceService} from "../services/remote/api-service.service";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {Success} from "../shared/ResultState";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  isLoading :boolean = false;
  otpOptions: NgxOtpInputComponentOptions = {
    otpLength: 6,
    autoFocus:true,
    autoBlur:true,
    inputMode: 'numeric',
    showBlinkingCursor:true
  };

  constructor(  private snackBar: MatSnackBar,
                private apiService: ApiServiceService,
                private router: Router,
                @Inject(MAT_DIALOG_DATA) public data: { email: string },
                public dialogRef: MatDialogRef<VerificationComponent>){
    this.email = data.email;
  }

  otp: string[] = []; // or string, based on your usage
  email: string;
  status = NgxOtpStatus;

  onOtpChange(otpValues: string[]): void {
    this.otp = otpValues;

  }

  onSubmit(): void {
    const val = this.otp.join('');
    if (val.length <6) {
      this.showMessage("Please enter complete OTP");
    }{
      this.isLoading = true;
    this.apiService.VerifyOTPEvent(this.email,val).subscribe(result=>{
      if (result instanceof Success) {
        this.isLoading = false;
        this.dialogRef.close(true);
      }else{
        this.isLoading = false;
        this.showMessage(result.message ?? "Error in OTP!!");
      }
      });
    }
    // Handle form submission logic here

  }



  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }


  resendCode(): void {
    this.isLoading = true;
    // Handle resend code logic
    this.apiService.OTPEvent(this.email).subscribe(result => {
      if (result instanceof Success) {
        this.isLoading = false;
        this.showMessage(result.data ?? "OTP has sent to your email");
      } else {
        this.isLoading = false;
        this.showMessage(result.message ?? "Error in OTP!!");
      }
    })
  }


}
