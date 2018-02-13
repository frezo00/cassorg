import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../store';
import * as AuthActions from '../store/auth.actions';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  showPassword: boolean;
  isAuthenicated$: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.AuthState>,
    private fb: FormBuilder,
    private af: AngularFireAuth
  ) {}

  ngOnInit() {
    this.initForm();
    this.isAuthenicated$ = this.store.select(fromAuth.getIsAuthenticated);
    this.af.authState.subscribe(data => console.log(data));
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
