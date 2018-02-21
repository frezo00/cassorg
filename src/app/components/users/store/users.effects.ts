import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { IUser } from '../../../models/user.model';

@Injectable()
export class UsersEffects {
  @Effect()
  getRecentUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.GET_RECENT_USERS),
    switchMap(() =>
      this.afDB
        .collection('users')
        .snapshotChanges()
        .pipe(
          map(usersData => {
            const users = usersData.map(user => {
              const data = user.payload.doc.data() as IUser;
              const id = user.payload.doc.id;
              return { id, ...data };
            });
            console.log('users:', users);
            return new UsersActions.GetRecentUsersComplete(users);
          }),
          catchError(error => {
            console.log('error:', error);
            return Observable.of(new UsersActions.Errors(error));
          })
        )
    )
  );

  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.CREATE_USER),
    map((action: UsersActions.CreateUsers) => action.payload),
    switchMap((user: IUser) => {
      return Observable.of();
    })
  );

  constructor(private actions$: Actions, private afDB: AngularFirestore) {}
}
