import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../auth/store';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: Observable<IUser>;

  constructor(private store: Store<fromAuth.AuthState>) {}

  ngOnInit() {
    this.user = this.store.select(fromAuth.getLoggedInUser);
    console.log('user is: ', this.user);
  }
}
