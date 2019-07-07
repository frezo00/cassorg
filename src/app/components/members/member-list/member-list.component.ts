import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMember, ISort } from '../../../models';
import { getMembersGroups, Go, MembersState, SortMembers } from '../../../store';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members$: Observable<IMember[]>;
  searchText: string;
  searchKeys: string[] = ['firstName', 'lastName'];

  constructor(private store: Store<MembersState>) {}

  ngOnInit() {
    this.members$ = this.store.select(getMembersGroups);
    this.members$.subscribe(m => console.log('members', m));
  }

  navigateToForm(): void {
    this.store.dispatch(new Go('/members/new'));
  }

  navigateToProfile(id: string): void {
    this.store.dispatch(new Go(`/members/${id}`));
  }

  setSort(sort: ISort): void {
    this.store.dispatch(new SortMembers(sort));
  }

  onSearchChange(searchValue: string) {
    this.searchText = searchValue;
  }
}
