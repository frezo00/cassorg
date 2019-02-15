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
  mergeMap,
  tap,
  combineLatest
} from 'rxjs/operators';

import {
  ActivitiesActionTypes,
  GetActivitiesSuccess,
  GetActivitiesBegin,
  ActivityErrors,
  CreateActivityBegin,
  CreateActivitySuccess
} from './activities.actions';
import { getActivities } from './activities.selectors';
import { Go } from '../../../router/store';
import { getCurrentUser } from '../../users/store';
import { getActiveProject } from '../../project/store';
import { AppState } from '../../../store';

import { ActivitiesService } from '../../../services';
import { IGroup, IProject, IActivity } from '../../../models';

@Injectable()
export class ActivitiesEffects {
  @Effect()
  getActivities$: Observable<Action> = this.actions$.pipe(
    ofType(ActivitiesActionTypes.GET_ACTIVITIES_BEGIN),
    withLatestFrom(this.store$.select(getActivities)),
    filter(
      ([action, activities]: [GetActivitiesBegin, IActivity[]]) =>
        !activities || !activities.length
    ), // only continue if activities don't exist
    map(
      ([action, activities]: [GetActivitiesBegin, IActivity[]]) =>
        action.payload
    ),
    switchMap((projectId: string) =>
      this.activitiesService.getActivities(projectId).pipe(
        map((activities: IActivity[]) => new GetActivitiesSuccess(activities)),
        catchError(error => of(new ActivityErrors(error)))
      )
    )
  );

  @Effect()
  createActivity$: Observable<Action> = this.actions$.pipe(
    ofType(ActivitiesActionTypes.CREATE_ACTIVITY_BEGIN),
    withLatestFrom(this.store$.select(getActiveProject)),
    filter(([action, project]: [CreateActivityBegin, IProject]) => !!project),
    withLatestFrom(
      this.store$.select(getCurrentUser),
      ([action, project], currentUser) => [
        { ...action.payload, createdBy: currentUser.id } as IActivity,
        project.tag
      ]
    ),
    switchMap(([newActivity, projectId]: [IActivity, string]) =>
      from(this.activitiesService.createActivity(newActivity, projectId)).pipe(
        mergeMap(() => [new CreateActivitySuccess(), new Go('/activities')]),
        catchError(error => of(new ActivityErrors(error)))
      )
    )
  );

  /* @Effect()
  updateGroup$: Observable<Action> = this.actions$.pipe(
    ofType(ActivitiesActionTypes.UPDATE_GROUP_BEGIN),
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
          new Go(`/groups/${groupId}`)
        ]),
        catchError(error => of(new GroupErrors(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateGroupMembers$ = this.actions$.pipe(
    ofType(ActivitiesActionTypes.UPDATE_GROUP_MEMBERS_BEGIN),
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
  ); */

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private activitiesService: ActivitiesService
  ) {}
}
