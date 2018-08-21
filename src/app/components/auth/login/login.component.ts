import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  showPassword: boolean;
  errorMessage: Observable<string>;

  constructor(
    private store: Store<fromAuth.AuthState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.errorMessage = this.store.select(fromAuth.getErrorMessage);
  }

  initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
    this.showPassword = false;
  }

  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'You must enter a value'
      : this.password.hasError('minlength')
        ? 'Must be minimum 6 characters'
        : '';
  }

  onLogin() {
    this.store.dispatch(new AuthActions.TryLogin(this.loginForm.value));
  }
}
