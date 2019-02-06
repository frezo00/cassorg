import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthError } from '../../../models';
import {
  AuthState,
  ShowLoading,
  LoginBegin,
  Go,
  RemoveErrors,
  getAuthErrors
} from '../../../store';

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
  errorMessage: Observable<AuthError>;

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.errorMessage = this.store.select<AuthError>(getAuthErrors);
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
      ? 'Ovo polje je obavezno'
      : this.email.hasError('email')
        ? 'Neispravan email format'
        : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'Ovo polje je obavezno'
      : this.password.hasError('minlength')
        ? 'Potrebno je minimalno 6 znakova'
        : '';
  }

  onLogin() {
    this.store.dispatch(new ShowLoading(true));
    this.store.dispatch(new LoginBegin(this.loginForm.value));
  }

  goToRegister() {
    this.loginForm.reset();
    this.store.dispatch(new Go('/auth/register'));
    this.store.dispatch(new RemoveErrors());
  }
}
