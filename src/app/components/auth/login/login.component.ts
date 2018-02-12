import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuthenicated$: Observable<boolean>;

  constructor(private store: Store<fromAuth.AuthState>) {}

  ngOnInit() {
    this.isAuthenicated$ = this.store.select(fromAuth.getIsAuthenticated);
  }

  onLogin() {
    // this.store.dispatch(new AuthActions.SetAuthenicated());
    const authData = {
      email: 'frano@mail.com',
      password: 'password'
    };
    this.store.dispatch(new AuthActions.TryLogin(authData));
  }
}
