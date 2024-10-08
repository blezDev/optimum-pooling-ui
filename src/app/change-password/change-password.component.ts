import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiServiceService} from '../services/remote/api-service.service';
import {Router} from '@angular/router';
import {Success} from '../shared/ResultState';
import {ToggleModeService} from "../services/toggle-mode.service";
import {UIState} from "../shared/UIState";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isLoading: boolean = false;
  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  },);

  email: string | null = null;

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.email = navigation.extras.state['email'];

    }
  }

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private apiService: ApiServiceService,
              private router: Router,
              private toggleModeService: ToggleModeService,) {
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  //TODO("ADDED TEMP EMAIL FOR ERROR, REPLACE LATER")
  onSubmit() {

    if (this.changePasswordForm.valid && (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmPassword)) {
      this.isLoading = true;
      const {newPassword} = this.changePasswordForm.value
      if (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmPassword) {
        this.apiService.ChangePassword(this.email ?? "msaikrishna824@gmail.com", newPassword!!).subscribe(res => {
          if (res instanceof Success) {
            this.isLoading = false;
            this.showMessage(res.data ?? "Successfully changed password");
            this.toggleModeService.toggleMode(UIState.Login)
            this.router.navigateByUrl('/login', {replaceUrl: true});
          } else {
            this.isLoading = false;
            this.showMessage(res.message ?? "Successfully changed password");
          }
        })
      }
    } else {
      this.showMessage("Password doesn't match");
    }
  }
}

