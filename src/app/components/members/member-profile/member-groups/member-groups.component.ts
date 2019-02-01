import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  AppState,
  GetGroupsBegin,
  getMemberGroups,
  Go
} from '../../../../store';
import { IGroup } from '../../../../models';

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.scss']
})
export class MemberGroupsComponent implements OnInit {
  @Input() memberId: string;
  memberGroups: IGroup[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(getMemberGroups(this.memberId))
      .subscribe((groups: IGroup[]) => (this.memberGroups = groups));
  }

  getGroupMembersLength(groupMembersObj: any): number {
    return Object.keys(groupMembersObj).length;
  }

  goToGroup(groupId: string): void {
    this.store.dispatch(new Go({ path: `/groups/${groupId}` }));
  }
}
