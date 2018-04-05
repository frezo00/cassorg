import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { IUser, User } from '../../../models/user.model';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class UsersEffects {

  @Effect({dispatch: false})
  getAllUsers$ = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.GET_ALL_USERS),
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
            console.log('userList: ', users);
            // return new UsersActions.GetRecentUsersComplete(users);
          }),
          catchError(error => {
            console.log('error:', error);
            return Observable.of(new UsersActions.Errors(error));
          })
        )
    )
  );

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
    map((action: UsersActions.CreateUser) => action.payload),
    tap(user => console.log('user:', user)),
    switchMap((user: IUser) => {
      fromPromise(
        this.afDB
          .collection('users').doc(user.id).set(user)
      ).pipe(
        map(userData => {
          console.log('userData:', userData);
        }),
        catchError(error => {
          console.error('error', error);
          return Observable.of(error);
        })
      );
      return Observable.of();
    })
  );

  constructor(private actions$: Actions, private afDB: AngularFirestore) {}
}
