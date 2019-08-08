import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGroup } from '../../../models';
import { AppState, getGroups } from '../../../store';

@Component({
  selector: 'app-activity-participants-form',
  templateUrl: './activity-participants-form.component.html'
})
export class ActivityParticipantsFormComponent implements OnInit {
  groups$: Observable<IGroup[]>;
  toggleBtn: 'groups' | 'members';
  groupSearch: string;
  groupSearchKeys = ['name'];

  constructor(private _store: Store<AppState>) {}

  ngOnInit() {
    this.toggleBtn = 'groups';
    this.groupSearch = '';
    this.groups$ = this._store.select(getGroups);
  }
}
