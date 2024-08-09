import {Component} from '@angular/core';
import {ToggleModeService} from "../services/toggle-mode.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {UIState} from "../shared/UIState";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiServiceService} from "../services/remote/api-service.service";
import {ResultState, Success} from "../shared/ResultState";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { AuthResponseModel } from '../shared/ResponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
      state('void', style({opacity: 0, transform: 'translateY(20px)'})),
      transition('void => *', [
        animate("600ms ease-out", keyframes([
          style({opacity: 0, transform: 'translateY(20px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate("600ms ease-out", keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-20px)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class LoginComponent {

  uiState: UIState = UIState.Login;
  isLoading :boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  state: ResultState<AuthResponseModel> | null = null;

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const {email, password} = this.loginForm.value;
      this.apiService.LoginEvent(email!!, password!!).subscribe(result => {
        this.state = result;
        if (result instanceof Success) {
          this.isLoading = false;
          console.log(result.data)
          this.setCookies("email", result.data?.email);
          this.setCookies("firstName", result.data?.firstName);
          this.setCookies("lastName", result.data?.lastName);
          this.setCookies("userId", result.data?.userId);
    
       
          this.showMessage(result.data?.message ?? "Successfully logged in");
          this.router.navigateByUrl('/home',{replaceUrl: true});
        } else {
          this.isLoading = false;
          console.log(result)
          this.showMessage(result.message ?? "Failed to log in");
        }
      })


    } else {
      this.showMessage("Please fill the required fields.");
    }
  }


  constructor(private toggleModeService: ToggleModeService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private apiService: ApiServiceService,
              private router: Router,
              private cookies: CookieService) {
    this.toggleModeService.isSignUpMode.subscribe(mode => {
      this.uiState = mode;
    });
  }

  setCookies(key : string, value : string) {
    this.cookies.set(key, value);
  }
  getCookies(key : string) {
    return this.cookies.get(key);
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }


  toggleMode(uiState: UIState): void {
    this.toggleModeService.toggleMode(uiState);
  }

  login() {

  }
  loginWithGoogle() {
    // Placeholder for Google sign-in functionality
    console.log('Sign in with Google');
  }


  protected readonly UIState = UIState;
}
