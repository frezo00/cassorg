import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  MembersActionTypes,
  GetMembersBegin,
  GetMembersSuccess,
  SetMembersError,
  CreateMemberBegin,
  CreateMemberSuccess
} from './members.actions';
import {
  withLatestFrom,
  switchMap,
  filter,
  map,
  catchError,
  tap,
  combineLatest
} from 'rxjs/operators';
import { AppState } from '../../../store';
import { getActiveProject } from '../../project/store';
import { IMember, IProject } from '../../../models';
import { MembersService } from '../members.service';

@Injectable()
export class MembersEffects {
  @Effect()
  getMembers$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.GET_MEMBERS_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(([action, project]: [GetMembersBegin, IProject]) => !!project),
    withLatestFrom(
      this.store$.select(state => state.members.members),
      ([action, project], members) => [project.tag, members]
    ),
    filter(([projectId, members]: [string, IMember[]]) => !members),
    map(([projectId, members]: [string, IMember[]]) => projectId),
    switchMap((projectId: string) =>
      this.membersService.getMembers(projectId).pipe(
        map((members: IMember[]) => {
          console.log('members', members);
          return new GetMembersSuccess(members);
        }),
        catchError(error => of(new SetMembersError(error)))
      )
    )
  );

  @Effect()
  createMember$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.CREATE_MEMBER_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(([action, project]: [CreateMemberBegin, IProject]) => !!project),
    withLatestFrom(
      this.store$.select(state => state.users.currentUser),
      ([action, project], currentUser) => [
        action.payload,
        project.tag,
        currentUser.id
      ]
    ),
    map(([memberData, projectId, currentUserId]: [IMember, string, string]) => [
      { ...memberData, createdBy: currentUserId } as IMember,
      projectId
    ]),
    switchMap(([newMember, projectId]: [IMember, string]) =>
      from(this.membersService.createMember(newMember, projectId)).pipe(
        map(() => {
          console.log('member created');
          return new CreateMemberSuccess();
        }),
        catchError(error => of(new SetMembersError(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private membersService: MembersService
  ) {}
}
