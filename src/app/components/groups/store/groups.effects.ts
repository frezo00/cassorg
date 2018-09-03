import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DocumentSnapshot } from 'angularfire2/firestore';
import { Observable, of, from } from 'rxjs';
import {
  withLatestFrom,
  filter,
  switchMap,
  map,
  catchError,
  mergeMap,
  tap
} from 'rxjs/operators';

import {
  GroupsActionTypes,
  GetGroupsSuccess,
  GroupErrors,
  CreateGroupBegin,
  CreateGroupSuccess
} from './groups.actions';
import { OpenModal } from '../../common/store';
import { getGroups } from './groups.selectors';
import { getCurrentUser } from '../../users/store';
import { AppState } from '../../../store';

import { GroupsService } from '../groups.service';
import { IGroup, IUser } from '../../../models';

@Injectable()
export class GroupsEffects {
  @Effect()
  getGroups$: Observable<Action> = this.actions$.pipe(
    ofType(GroupsActionTypes.GET_GROUPS_BEGIN),
    withLatestFrom(this.store$.select(getGroups)),
    filter(([action, groups]) => !groups), // only continue if groups don't exist
    switchMap(() =>
      this.groupsService.getGroups().pipe(
        map((groups: IGroup[]) => new GetGroupsSuccess(groups)),
        catchError(error => of(new GroupErrors(error)))
      )
    )
  );

  @Effect()
  createGroup$ = this.actions$.pipe(
    ofType(GroupsActionTypes.CREATE_GROUP_BEGIN),
    withLatestFrom(this.store$.select(getCurrentUser)),
    map(([action, currentUser]: [CreateGroupBegin, IUser]) => [
      action.payload,
      currentUser.id
    ]),
    map(([groupData, currentUserId]: [IGroup, string]) => {
      return { ...groupData, createdBy: currentUserId } as IGroup;
    }),
    switchMap((newGroupData: IGroup) =>
      from(this.groupsService.createGroup(newGroupData)).pipe(
        mergeMap(() => [new OpenModal(false), new CreateGroupSuccess()]),
        catchError(error => of(new GroupErrors(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private groupsService: GroupsService
  ) {}
}
