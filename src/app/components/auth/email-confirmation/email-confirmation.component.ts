import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store';
import * as fromRouter from '../../../router/store';
import { Observable } from 'rxjs';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['../auth.scss']
})
export class EmailConfirmationComponent implements OnInit {
  user: Observable<IUser>;

  constructor(private store: Store<fromAuth.AuthState>) {}

  ngOnInit() {
    this.store.dispatch(new fromAuth.CheckLoggedInUser());
    this.user = this.store.select(fromAuth.getLoggedInUser);
  }

  checkEmailConfirmation() {
    this.store.dispatch(new fromRouter.Go({ path: '/auth/login' }));
  }

  resendEmail() {
    this.store.dispatch(new fromAuth.SendVerificationEmail());
  }
}
