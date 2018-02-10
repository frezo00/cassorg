import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuthenicated$: Observable<boolean>;

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    this.isAuthenicated$ = this.store.select(fromStore.getIsAuthenticated);
  }
}
