import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, getGroups, Go, selectAllGroups } from '../../../store';
import { IGroup } from '../../../models';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups: Observable<IGroup[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.groups = this.store.select(getGroups);
  }

  getGroupMembersLength(groupMembersObj: any): number {
    return Object.keys(groupMembersObj).length;
  }

  goToNewGroup(): void {
    this.store.dispatch(new Go('/groups/new'));
  }

  goToGroup(groupId: string): void {
    this.store.dispatch(new Go(`/groups/${groupId}`));
  }
}
