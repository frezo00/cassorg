import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    // this.store.dispatch(new fromStore.CheckLoggedInUser());
  }
}
