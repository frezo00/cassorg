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
  CreateMemberSuccess,
  GetSingleMemberSuccess,
  GetSingleMemberBegin,
  UpdateMemberBegin,
  UpdateMemberSuccess
} from './members.actions';
import {
  withLatestFrom,
  switchMap,
  filter,
  map,
  catchError,
  tap,
  combineLatest,
  mergeMap
} from 'rxjs/operators';
import { AppState } from '../../../store';
import { Go } from '../../../router/store';
import { UpdateApplicantBegin } from '../../applicants/store';
import { getActiveProject } from '../../project/store';
import { IMember, IProject } from '../../../models';
import { MembersService } from '../members.service';
import { DocumentSnapshot } from '@angular/fire/firestore';

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
        map((members: IMember[]) => new GetMembersSuccess(members)),
        catchError(error => of(new SetMembersError(error)))
      )
    )
  );

  @Effect()
  getSingleMember$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.GET_SINGLE_MEMBER_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(([action, project]: [GetSingleMemberBegin, IProject]) => !!project),
    withLatestFrom(
      this.store$.select(state => state.members.members),
      ([action, project], members) => [action.payload, project.tag, members]
    ),
    switchMap(([memberId, projectId, members]: [string, string, IMember[]]) => {
      if (!members) {
        return from(this.membersService.getMember(memberId, projectId)).pipe(
          map((member: DocumentSnapshot<IMember>) => {
            if (!!member.exists) {
              return new GetSingleMemberSuccess({
                ...member.data(),
                id: member.id
              } as IMember);
            }
            return new Go({ path: '/members' });
          }),
          catchError(error => of(new SetMembersError(error)))
        );
      } else {
        const currentMember: IMember = members.find(
          member => member.id === memberId
        );
        if (!!currentMember) {
          return of(new GetSingleMemberSuccess(currentMember));
        }
        return of(new Go({ path: '/members' }));
      }
    })
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
        mergeMap(() => {
          const actions: Action[] = [
            new CreateMemberSuccess(),
            new Go({ path: '/members' })
          ];
          if (!!newMember.applicantId) {
            actions.push(new UpdateApplicantBegin(newMember.applicantId));
          }
          return actions;
        }),
        catchError(error => of(new SetMembersError(error)))
      )
    )
  );

  @Effect()
  updateMember$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.UPDATE_MEMBER_BEGIN),
    combineLatest(this.store$.select(getActiveProject)),
    filter(([action, project]: [UpdateMemberBegin, IProject]) => !!project),
    map(([action, project]: [UpdateMemberBegin, IProject]) => [
      action.payload.id,
      action.payload.memberData,
      project.tag
    ]),
    switchMap(([memberId, memberData, projectId]: [string, IMember, string]) =>
      from(
        this.membersService.updateMember(memberId, memberData, projectId)
      ).pipe(
        mergeMap(() => [
          new UpdateMemberSuccess(),
          new Go({ path: `/members/${memberId}` })
        ]),
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
