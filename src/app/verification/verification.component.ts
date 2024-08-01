import { Component } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  otp: string[] = ['', '', '', '', '', ''];

  onSubmit() {
    const otpCode = this.otp.join('');
    console.log('Entered OTP:', otpCode);
    // You can add logic here to send the OTP code to your backend for verification.
  }

  resendCode() {
    console.log('Resend code clicked');
    // Logic to resend the OTP code can be added here.
  }
}
