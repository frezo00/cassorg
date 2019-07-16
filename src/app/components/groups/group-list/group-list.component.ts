import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGroup } from '../../../models';
import { AppState, getGroups, Go } from '../../../store';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {
  groups$: Observable<IGroup[]>;

  searchText: string;
  searchKeys: string[] = ['name'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(getGroups);
  }

  // TODO: Move this into a pipe
  getGroupMembersLength(groupMembersObj: any): number {
    return Object.keys(groupMembersObj).length;
  }

  goToNewGroup(): void {
    this.store.dispatch(new Go('/groups/new'));
  }

  goToGroup(groupId: string): void {
    this.store.dispatch(new Go(`/groups/${groupId}`));
  }

  onSearchChange(searchValue: string): void {
    this.searchText = searchValue;
  }
}
