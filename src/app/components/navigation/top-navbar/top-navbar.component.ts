import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUserLogin } from '../../../models';
import { AppState, getUserLoginData, LogoutBegin } from '../../../store';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  @Output()
  toggleSide = new EventEmitter();
  @Input()
  isMobile: any;

  user: Observable<IUserLogin>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user = this.store.select(getUserLoginData);
  }

  toggleSidenav() {
    this.toggleSide.emit();
  }

  logout() {
    this.store.dispatch(new LogoutBegin());
  }
}
