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
  Go,
  getAuthErrors,
  RegisterBegin,
  RemoveErrors
} from '../../../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fullName: FormControl;
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
    this.fullName = new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.registerForm = this.fb.group({
      fullName: this.fullName,
      email: this.email,
      password: this.password
    });
    this.showPassword = false;
  }

  getFullNameErrorMessage() {
    return this.fullName.hasError('required')
      ? 'Ovo polje je obavezno'
      : this.fullName.hasError('maxlength')
        ? 'Text je predug'
        : '';
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

  onRegister() {
    this.store.dispatch(new ShowLoading(true));
    this.store.dispatch(new RegisterBegin(this.registerForm.value));
  }

  goToLogin() {
    this.registerForm.reset();
    this.store.dispatch(new Go('/auth/login'));
    this.store.dispatch(new RemoveErrors());
  }
}
