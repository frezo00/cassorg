import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, Go, getGroups } from '../../../store';
import { getActivities, selectTotalActivities } from '../store';
import { IActivity, IGroup } from '../../../models';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  activities$: Observable<IActivity[]>;
  activitiesTotal$: Observable<number>;
  sortingGroups$: Observable<{ id: string; name: string }[]>;
  activeGroup$: BehaviorSubject<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.activeGroup$ = new BehaviorSubject<string>('');
    this.activities$ = this.store.select(getActivities);
    this.activitiesTotal$ = this.store.select(selectTotalActivities);
    this.sortingGroups$ = this.store.select(getGroups).pipe(
      map((gs: IGroup[]) =>
        [{ id: '', name: 'Sve', color: '' }].concat(
          gs.map((g: IGroup) => {
            return { id: g.id, name: g.name, color: g.color };
          })
        )
      )
    );
  }

  setActiveGroup(groupId: string) {
    this.activeGroup$.next(groupId);
  }

  goToNewActivity(): void {
    this.store.dispatch(new Go('/activities/new'));
  }
}
