import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import {
  withLatestFrom,
  filter,
  switchMap,
  map,
  catchError,
  mergeMap
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
import { AppState } from '../../../store';
import { GroupsService } from '../groups.service';
import { IGroup } from '../../../models';
import { DocumentSnapshot } from 'angularfire2/firestore';

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
  createGroup$: Observable<Action> = this.actions$.pipe(
    ofType(GroupsActionTypes.CREATE_GROUP_BEGIN),
    map((action: CreateGroupBegin) => action.payload),
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
