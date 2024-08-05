import { Component } from '@angular/core';
import {NgxOtpInputComponent, NgxOtpInputComponentOptions, NgxOtpStatus} from 'ngx-otp-input';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  otp: string = ''; // Single string for OTP

  otpOptions: NgxOtpInputComponentOptions = {
    otpLength: 6,
    autoFocus:true,
    autoBlur:true,
    inputMode: 'numeric',
    showBlinkingCursor:true
  };

  status = NgxOtpStatus;

  onSubmit(): void {
    // Handle form submission

  }

  resendCode(): void {
    // Handle resend code logic
    console.log('Resend code');
  }
}

