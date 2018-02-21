import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../../auth/store';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  @Output() toggleSide = new EventEmitter<boolean>();
  @Input() isMobile: any;
  user: Observable<IUser>;

  constructor(private store: Store<fromAuth.AuthState>) {}

  ngOnInit() {
    this.user = this.store.select(fromAuth.getLoggedInUser);
  }

  toggleSidenav() {
    this.toggleSide.emit(true);
  }

  logout() {
    this.store.dispatch(new fromAuth.Logout());
  }
}
