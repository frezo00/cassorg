
import {of as observableOf,  Observable ,  from as fromPromise } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import * as UsersActions from './users.actions';
import { IUser, User, IProjectUser } from '../../../models/user.model';
import { AppState } from '../../../store';
import { UsersService } from '../user.service';

@Injectable()
export class UsersEffects {
  @Effect({ dispatch: false })
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
            return observableOf(new UsersActions.Errors(error));
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
            return observableOf(new UsersActions.Errors(error));
          })
        )
    )
  );

  @Effect({ dispatch: false })
  createUser$: Observable<Action | IUser> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.CREATE_USER),
    map((action: UsersActions.CreateUser) => action.payload),
    tap(data => console.log('user data:', data))
    // withLatestFrom(this.store$),
    /* map(([action, store]: [UsersActions.CreateUser, AppState]) => {
      return <IUser> {
        userID: action.payload.userID,
        projectID: store.project.activeProject.id,
        role: action.payload.role,
        createdAt: new Date(),
        lastLogin: null,
        createdByAdmin: store.auth.loggedInUser.id
      };
    }), */
    // map((action: UsersActions.CreateUser) => action.payload),
    /* switchMap((projectUser: IProjectUser) => {
      fromPromise(
        <Promise<any>>this.userService.createProjectUser(projectUser)
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
    }) */
  );

  @Effect()
  createProjectUser$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.CREATE_PROJECT_USER),
    withLatestFrom(this.store$),
    map(([action, store]: [UsersActions.CreateProjectUser, AppState]) => {
      return <IProjectUser>{
        user: action.payload.user,
        projectID: store.project.activeProject.id,
        role: action.payload.role,
        createdAt: new Date(),
        lastLogin: null,
        createdByAdmin: store.auth.loggedInUser.id
      };
    }),
    // map((action: UsersActions.CreateUser) => action.payload),
    tap(data => console.log('project user data:', data)),
    switchMap((projectUser: IProjectUser) => {
      fromPromise(<Promise<any>>(
        this.userService.createProjectUser(projectUser)
      )).pipe(
        map(userData => {
          console.log('userData:', userData);
        }),
        catchError(error => {
          console.error('error', error);
          return observableOf(error);
        })
      );
      return observableOf();
    })
  );

  constructor(
    private actions$: Actions,
    private afDB: AngularFirestore,
    private store$: Store<AppState>,
    private userService: UsersService
  ) {}
}
