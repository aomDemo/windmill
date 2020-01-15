import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { AuthService } from '@apiomat/ngx-aom-authentication';
import { filter, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService, private snackbarService: SnackbarService) {
    this.authService.isAuthenticated
      .pipe(
        filter(isAuth => isAuth),
        tap(() => this.router.navigate(['/'])),
        take(1)
      )
      .subscribe();
  }

  ngOnInit() {}

  async onLogin() {
    const values = this.form.value;
    try {
      const successLogin = await this.authService.loginWithCredentials(values.userName, values.password);
      if (!successLogin) {
        this.snackbarService.presentErrorMessage('An error occurred during login.');
      }
    } catch (error) {
      if (error.statusCode === 840) {
        this.snackbarService.presentErrorMessage('Login credentials are incorrect.');
      } else if (error.statusCode === 401) {
        this.snackbarService.presentErrorMessage('Login credentials must be entered.');
      } else {
        this.snackbarService.presentErrorMessage('An error occurred during login.');
      }
    }
  }

  onResetPassword() {
    this.snackbarService.presentInfoMessage('Not implemented', 10000);
  }
}
