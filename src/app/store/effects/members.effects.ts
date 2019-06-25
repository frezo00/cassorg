import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { withLatestFrom, switchMap, filter, map, catchError, tap, mergeMap } from 'rxjs/operators';

import { AppState } from '../reducers';
import {
  Go,
  Back,
  MembersActionTypes,
  GetMembersBegin,
  GetMembersSuccess,
  SetMembersError,
  CreateMemberBegin,
  CreateMemberSuccess,
  GetSingleMemberSuccess,
  GetSingleMemberBegin,
  UpdateMemberBegin,
  UpdateMemberSuccess,
  UploadProfileImageBegin,
  UpdateMemberProfileImageBegin,
  UpdateMemberProfileImageSuccess,
  UpdateGroupMembersBegin,
  UpdateApplicantBegin
} from '../actions';
import { getMembers, getActiveProject } from '../selectors';
import { IMember, IProject, IGroup } from '../../models';
import { MembersService } from '../../services';

@Injectable()
export class MembersEffects {
  @Effect()
  getMembers$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.GET_MEMBERS_BEGIN),
    withLatestFrom(this.store$.select(getMembers)),
    filter(([action, members]: [GetMembersBegin, IMember[]]) => !members || !members.length),
    map(([action, members]: [GetMembersBegin, IMember[]]) => action.payload),
    switchMap((projectId: string) =>
      this.membersService.getMembers(projectId).pipe(
        mergeMap((members: IMember[]) => [
          new GetMembersSuccess(members)
          // new GetMembersGroupsBegin()
        ]),
        catchError(error => of(new SetMembersError(error)))
      )
    )
  );

  @Effect()
  getSingleMember$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.GET_SINGLE_MEMBER_BEGIN),
    withLatestFrom(this.store$.select(getActiveProject)),
    filter(([action, project]: [GetSingleMemberBegin, IProject]) => !!project),
    withLatestFrom(this.store$.select(getMembers), ([action, project], members) => [
      action.payload,
      project.tag,
      members
    ]),
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
            return new Go('/members');
          }),
          catchError(error => of(new SetMembersError(error)))
        );
      } else {
        const currentMember: IMember = members.find(member => member.id === memberId);
        if (!!currentMember) {
          return of(new GetSingleMemberSuccess(currentMember));
        }
        return of(new Go('/members'));
      }
    })
  );

  @Effect()
  createMember$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.CREATE_MEMBER_BEGIN),
    withLatestFrom(this.store$.select(getActiveProject)),
    filter(([action, project]: [CreateMemberBegin, IProject]) => !!project),
    withLatestFrom(
      // TODO: Change the way getting current logged in user
      this.store$.select(state => state.users.currentUser),
      ([action, project], currentUser) => [
        { ...action.payload.member, createdBy: currentUser.id } as IMember,
        project.tag,
        action.payload.hasImage,
        action.payload.memberGroups
      ]
    ),
    switchMap(
      ([newMember, projectId, hasImage, memberGroups]: [
        IMember,
        string,
        boolean,
        { [id: string]: boolean }
      ]) =>
        from(this.membersService.createMember(newMember, projectId)).pipe(
          mergeMap((memberRef: DocumentReference) => {
            const actions: Action[] = [new CreateMemberSuccess()];
            if (!!hasImage) {
              actions.push(new UploadProfileImageBegin(memberRef.id));
            } else {
              // actions.push(new Go({ path: '/members' }));
              actions.push(new Back());
            }
            if (!!newMember.applicantId) {
              actions.push(new UpdateApplicantBegin(newMember.applicantId));
            }
            if (!!memberGroups) {
              Object.keys(memberGroups).forEach((gID: string) =>
                actions.push(
                  new UpdateGroupMembersBegin({
                    groupId: gID,
                    memberObj: {
                      mId: memberRef.id,
                      set: memberGroups[gID]
                    }
                  })
                )
              );
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
    withLatestFrom(this.store$.select(getActiveProject)),
    filter(([action, project]: [UpdateMemberBegin, IProject]) => !!project),
    map(([action, project]: [UpdateMemberBegin, IProject]) => [
      action.payload.id,
      action.payload.memberData,
      project.tag,
      action.payload.hasImage,
      action.payload.memberGroups
    ]),
    switchMap(
      ([memberId, memberData, projectId, hasImage, memberGroups]: [
        string,
        IMember,
        string,
        boolean,
        { [id: string]: boolean }
      ]) =>
        from(this.membersService.updateMember(memberId, memberData, projectId)).pipe(
          mergeMap(() => {
            const actions: Action[] = [new UpdateMemberSuccess()];
            if (!!hasImage) {
              actions.push(new UploadProfileImageBegin(memberId));
            } else {
              // actions.push(new Go({ path: `/members/${memberId}` }));
              actions.push(new Back());
            }
            if (!!memberGroups) {
              Object.keys(memberGroups).forEach((gID: string) =>
                actions.push(
                  new UpdateGroupMembersBegin({
                    groupId: gID,
                    memberObj: {
                      mId: memberId,
                      set: memberGroups[gID]
                    }
                  })
                )
              );
            }
            return actions;
          }),
          catchError(error => of(new SetMembersError(error)))
        )
    )
  );

  @Effect({ dispatch: false })
  uploadProfileImage$ = this.actions$.pipe(
    ofType(MembersActionTypes.UPLOAD_PROFILE_IMAGE_BEGIN),
    withLatestFrom(this.store$.select(getActiveProject)),
    filter(([action, project]: [UploadProfileImageBegin, IProject]) => !!project),
    map(([action, project]: [UploadProfileImageBegin, IProject]) => [action.payload, project.tag]),
    switchMap(([memberId, projectId]: [string, string]) =>
      this.membersService.uploadProfileImage(memberId, projectId)
    )
  );

  @Effect()
  updateMemberProfileImage$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.UPDATE_MEMBER_PROFILE_IMAGE_BEGIN),
    withLatestFrom(this.store$.select(getActiveProject)),
    filter(([action, project]: [UpdateMemberProfileImageBegin, IProject]) => !!project),
    map(([action, project]: [UpdateMemberProfileImageBegin, IProject]) => [
      action.payload.id,
      action.payload.photoURL,
      project.tag
    ]),
    switchMap(([memberId, photoURL, projectId]: [string, string, string]) =>
      from(this.membersService.updateMemberProfileImage(memberId, photoURL, projectId)).pipe(
        mergeMap(() => [
          new UpdateMemberProfileImageSuccess(),
          // new Go({ path: `/members/${memberId}` })
          new Back()
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
