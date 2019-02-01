import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, getGroups, GetGroupsBegin, Go } from '../../../store';
import { IGroup } from '../../../models';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: Observable<IGroup[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // this.store.dispatch(new GetGroupsBegin());
    this.groups = this.store.select(getGroups);
    // this.modalService.addDynamicComponent(GroupFormComponent);
  }

  ngOnDestroy() {
    // this.modalService.removeDynamicComponent();
  }

  getGroupMembersLength(groupMembersObj: any): number {
    return Object.keys(groupMembersObj).length;
  }

  toToNewGroup() {
    this.store.dispatch(new Go({ path: '/groups/new' }));
  }
}
