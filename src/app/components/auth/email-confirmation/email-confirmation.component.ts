import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store';
import { Observable } from 'rxjs/Observable';
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
    this.user = this.store.select(fromAuth.getLoggedInUser);
  }

  checkEmailConfirmation() {
    this.store.dispatch(new fromAuth.SaveLoggedInUser());
  }
}
