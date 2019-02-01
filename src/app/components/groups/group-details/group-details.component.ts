import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  AppState,
  getSingleGroup,
  GetSingleGroupBegin,
  Go,
  getMembers,
  getGroupMembers,
  GetMembersBegin
} from '../../../store';
import { IGroup, IMember } from '../../../models';
import { Observable, of } from 'rxjs';
import { map, switchMap, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  group$: Observable<IGroup>;
  groupMembers$: Observable<IMember[]>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new GetSingleGroupBegin(params['id']));
      this.group$ = this.store.select(getSingleGroup(params['id']));
      this.group$.subscribe((g: IGroup) => {
        if (!!g) {
          this.groupMembers$ = this.store.select(getGroupMembers(g.members));
        }
      });
    });
  }

  optionsAction(action: string): void {
    this.group$.subscribe((group: IGroup) => {
      if (action === 'edit') {
        this.store.dispatch(
          new Go({
            path: `/groups/edit/${group.id}`
          })
        );
      }
    });
  }
}
