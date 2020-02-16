import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Member } from '../../../models';
import { getMembersGroups, Go, MembersState } from '../../../store';

@Component({
  selector: 'cas-member-list',
  templateUrl: './member-list.component.html'
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;
  searchText: string;
  total = 0;

  constructor(private _store: Store<MembersState>) {}

  ngOnInit(): void {
    this.members$ = this._store
      .select(getMembersGroups)
      .pipe(tap(members => (this.total = members.length)));
  }

  navigateToProfile(id: string): void {
    this._store.dispatch(new Go(`/members/${id}`));
  }
}
