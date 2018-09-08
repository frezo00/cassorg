import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, GetMembersBegin, Go } from '../../../store';
import { IMember } from '../../../models';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Observable<IMember[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetMembersBegin());
    this.members = this.store.select(state => state.members.members);
  }

  navigateToForm() {
    this.store.dispatch(new Go({ path: '/members/new' }));
  }
}
