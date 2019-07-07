import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
