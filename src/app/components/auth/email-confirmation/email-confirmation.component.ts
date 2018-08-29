import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { IUserLogin } from '../../../models/user.model';
import {
  AuthState,
  Go,
  SendVerificationEmail,
  getUserLoginData
} from '../../../store';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['../auth.scss']
})
export class EmailConfirmationComponent implements OnInit {
  user: Observable<IUserLogin>;

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.user = this.store.select(getUserLoginData);
  }

  checkEmailConfirmation() {
    this.store.dispatch(new Go({ path: '/auth/login' }));
  }

  resendEmail() {
    this.store.dispatch(new SendVerificationEmail());
  }
}
