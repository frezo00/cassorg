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
  catchError
} from 'rxjs/operators';
import { AppState } from '../../../store';
import { IMember } from '../../../models';
import { MembersService } from '../members.service';

@Injectable()
export class MembersEffects {
  @Effect()
  getMembers$: Observable<Action> = this.actions$.pipe(
    ofType(MembersActionTypes.GET_MEMBERS_BEGIN),
    withLatestFrom(this.store$.select(state => state.members.members)),
    filter(([action, members]: [GetMembersBegin, IMember[]]) => !members),
    switchMap(() =>
      this.membersService.getMembers().pipe(
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
    map((action: CreateMemberBegin) => action.payload),
    switchMap((newMember: IMember) =>
      from(this.membersService.createMember(newMember)).pipe(
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
