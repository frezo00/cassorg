import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  AppState,
  GetMembersBegin,
  Go,
  SortMembers,
  getMembers,
  getMembersGroups
} from '../../../store';
import { IMember, ISort } from '../../../models';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members$: Observable<IMember[]>;
  searchText: string;
  searchKeys: string[] = ['firstName', 'lastName'];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.members$ = this.store.select(getMembersGroups);
  }

  navigateToForm(): void {
    this.store.dispatch(new Go({ path: '/members/new' }));
  }

  navigateToProfile(id: string): void {
    this.store.dispatch(new Go({ path: `/members/${id}` }));
  }

  setSort(sort: ISort): void {
    this.store.dispatch(new SortMembers(sort));
  }
}
