import { of as observableOf, Observable, from as fromPromise, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from 'angularfire2/firestore';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';

import * as UsersActions from './users.actions';
import * as ProjectActions from '../../project/store';
import {
  IUser,
  User,
  IUserLogin,
  IApplicant
} from '../../../models/user.model';
import { AppState, SetErrors, GetProjectBegin } from '../../../store';
import { UsersService } from '../user.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UsersEffects {
  @Effect()
  getLoggedInUserDataBegin$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.GET_LOGGED_IN_USER_DATA_BEGIN),
    map((action: UsersActions.GetLoggedInUserDataBegin) => action.payload),
    switchMap((authId: string) =>
      this.userService.getUserByAuthId(authId).pipe(
        mergeMap((userData: IUser[]) => {
          const projId = userData[0].userOfProjects[0];
          return [
            new ProjectActions.GetProjectBegin(projId),
            new UsersActions.GetLoggedInUserDataSuccess(userData[0])
          ];
        }),
        catchError(error => of(new UsersActions.Errors(error)))
      )
    )
  );

  @Effect()
  getApplicants$: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.GET_APPLICANTS_BEGIN),
    switchMap(() =>
      this.userService.getApplicants().pipe(
        map(
          (applicants: IApplicant[]) =>
            new UsersActions.GetApplicantsSuccess(applicants)
        ),
        catchError(error => of(new UsersActions.Errors(error)))
      )
    )
  );

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

  @Effect({ dispatch: false })
  createProjectUser$ = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.CREATE_PROJECT_USER),
    withLatestFrom(this.store$)
    /* map(([action, store]: [UsersActions.CreateProjectUser, AppState]) => {
      return <IProjectUser>{
        user: action.payload.user,
        projectID: store.project.activeProject.tag,
        role: action.payload.role,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        createdByAdmin: store.auth.userLoginData.authId
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
    }) */
  );

  @Effect({ dispatch: false })
  checkIfUserExists = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.CHECK_IF_USER_EXISTS),
    map((action: UsersActions.CheckIfUserExists) => action.payload),
    // withLatestFrom(this.store$.select(state => state.auth.userLoginData)),
    // map(([action, storeState]: [UsersActions.CheckIfUserExists, IUserLogin]) => [action.payload, storeState]),
    switchMap((authId: string) =>
      fromPromise(this.userService.checkIfUserExists(authId)).pipe(
        map((userSnapshot: DocumentSnapshot<any>) => {
          console.log('useexis', userSnapshot);
          console.log('bool', userSnapshot.exists);
          return of(new UsersActions.PlainAction());
        }),
        catchError(error => {
          console.log('error', error);
          return of(new UsersActions.PlainAction());
        })
      )
    )
  );

  @Effect()
  createUserAfterRegister: Observable<Action> = this.actions$.pipe(
    ofType(UsersActions.UsersActionTypes.CREATE_USER_AFTER_REGISTER_BEGIN),
    map((action: UsersActions.CreateUserAfterRegisterBegin) => action.payload),
    // withLatestFrom(this.store$.select(state => state.auth.userLoginData)),
    // map(([action, storeState]: [UsersActions.CreateUserAfterRegister, IUserLogin]) => [action.payload, storeState]),
    switchMap((createdUser: IUserLogin) =>
      fromPromise(this.userService.createUserAfterRegister(createdUser)).pipe(
        map((currentUser: DocumentSnapshot<IUser>) => {
          console.log('data after register create', currentUser.data());
          return new UsersActions.GetLoggedInUserDataBegin(
            currentUser.data().authId
          );
        }),
        catchError(error => {
          console.error('error is', error);
          return of(new UsersActions.Errors(error));
        })
      )
    )
    /* switchMap(
      ([action, storeState]: [
        UsersActions.CreateUserAfterRegister,
        IUserLogin
      ]) =>
        fromPromise(this.userService.createUserAfterRegister(storeState)).pipe(
          map(data => {
            console.log('data', data);
            return of(new UsersActions.PlainAction());
          }),
          catchError(error => {
            console.log('error', error);
            return of(new UsersActions.PlainAction());
          })
        )
    ) */
  );

  constructor(
    private actions$: Actions,
    private afDB: AngularFirestore,
    private store$: Store<AppState>,
    private userService: UsersService,
    private authService: AuthService
  ) {}
}
