import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, of, from, forkJoin } from 'rxjs';
import {
  withLatestFrom,
  filter,
  switchMap,
  map,
  catchError,
  mergeMap,
  tap,
  combineLatest
} from 'rxjs/operators';

import {
  GroupsActionTypes,
  GetGroupsSuccess,
  GroupErrors,
  CreateGroupBegin,
  CreateGroupSuccess,
  UpdateGroupBegin,
  UpdateGroupSuccess,
  GetGroupsBegin,
  UpdateGroupMembersSuccess,
  UpdateGroupMembersBegin
} from './groups.actions';
import { getGroups } from './groups.selectors';
import { Go } from '../../../router/store';
import { getCurrentUser } from '../../users/store';
import { getActiveProject } from '../../project/store';
import { AppState } from '../../../store';

import { GroupsService } from '../groups.service';
import { IGroup, IUser, IProject } from '../../../models';

@Injectable()
export class GroupsEffects {
  @Effect()
  getGroups$: Observable<Action> = this.actions$.pipe(
    ofType(
      GroupsActionTypes.GET_GROUPS_BEGIN
      // GroupsActionTypes.GET_SINGLE_GROUP_BEGIN
    ),
    combineLatest(this.store$.select(getGroups)),
    filter(([action, groups]: [GetGroupsBegin, IGroup[]]) => !groups), // only continue if groups don't exist
    map(([action, groups]: [GetGroupsBegin, IGroup[]]) => action.payload),
    switchMap((projectId: string) =>
      this.groupsService.getGroups(projectId).pipe(
        map((groups: IGroup[]) => new GetGroupsSuccess(groups)),
        catchError(error => of(new GroupErrors(error)))
      )
    )
  );

  @Effect()
  createGroup$: Observable<Action> = this.actions$.pipe(
    ofType(GroupsActionTypes.CREATE_GROUP_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(([action, project]: [CreateGroupBegin, IProject]) => !!project),
    withLatestFrom(
      this.store$.select(getCurrentUser),
      ([action, project], currentUser) => [
        { ...action.payload, createdBy: currentUser.id } as IGroup,
        project.tag
      ]
    ),
    switchMap(([newGroup, projectId]: [IGroup, string]) =>
      from(this.groupsService.createGroup(newGroup, projectId)).pipe(
        mergeMap(() => [
          new CreateGroupSuccess(),
          new Go({ path: '/groups/' })
        ]),
        catchError(error => of(new GroupErrors(error)))
      )
    )
  );

  @Effect()
  updateGroup$: Observable<Action> = this.actions$.pipe(
    ofType(GroupsActionTypes.UPDATE_GROUP_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(([action, project]: [UpdateGroupBegin, IProject]) => !!project),
    map(([action, project]: [UpdateGroupBegin, IProject]) => [
      action.payload.id,
      action.payload.groupData,
      project.tag
    ]),
    switchMap(([groupId, groupData, projectId]: [string, IGroup, string]) =>
      from(this.groupsService.updateGroup(groupId, groupData, projectId)).pipe(
        mergeMap(() => [
          new UpdateGroupSuccess(groupData),
          new Go({ path: `/groups/${groupId}` })
        ]),
        catchError(error => of(new GroupErrors(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateGroupMembers$ = this.actions$.pipe(
    ofType(GroupsActionTypes.UPDATE_GROUP_MEMBERS_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(
      ([action, project]: [UpdateGroupMembersBegin, IProject]) => !!project
    ),
    map(([action, project]: [UpdateGroupMembersBegin, IProject]) => [
      action.payload.groupId,
      action.payload.memberObj,
      project.tag
    ]),
    tap(data => console.log('data is:', data)),
    switchMap(
      ([groupId, memberObj, projectId]: [
        string,
        { mId: string; set: boolean },
        string
      ]) =>
        from(
          this.groupsService.updateGroupMembers(groupId, memberObj, projectId)
        ).pipe(
          map(() => new UpdateGroupMembersSuccess()),
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
