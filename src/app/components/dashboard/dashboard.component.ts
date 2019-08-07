import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bottomToTop } from '../../animations';
import { IActivity, IGroup, IMember } from '../../models';
import { AppState, getActivities, getGroups, getMembers } from '../../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [bottomToTop]
})
export class DashboardComponent implements OnInit {
  members$: Observable<IMember[]>;
  groups$: Observable<IGroup[]>;
  activities$: Observable<IActivity[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.members$ = this.store.select(getMembers);
    this.groups$ = this.store.select(getGroups);
    this.activities$ = this.store.select(getActivities);
  }
}
