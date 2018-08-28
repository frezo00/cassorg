import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../../store';
import { IUserLogin } from '../../../models';

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

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.user = this.store.select(fromApp.getUserLoginData);
  }

  toggleSidenav() {
    this.toggleSide.emit();
  }

  logout() {
    this.store.dispatch(new fromApp.LogoutBegin());
  }
}
