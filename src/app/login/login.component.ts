import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login() {
    // Replace with actual authentication logic
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  loginWithGoogle() {
    // Placeholder for Google sign-in functionality
    console.log('Sign in with Google');
  }
}
