
import {of as observableOf, from as observableFrom,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  switchMap,
  mergeMap,
  tap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

import * as ProjectActions from './project.actions';
import * as UserActions from '../../users/store/users.actions';
import { IProject, Project } from '../../../models';
import { AppState } from '../../../store';
import { ProjectService } from '../project.service';

@Injectable()
export class ProjectEffects {
  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectActions.ProjectActionTypes.CREATE_PROJECT),
    withLatestFrom(this.store$),
    map(([action, store]: [ProjectActions.CreateProject, AppState]) => {
      return {
        name: action.payload.name,
        tag: action.payload.tag,
        createdBy: store.auth.loggedInUser.authId,
        createdAt: new Date()
        // administrators: new Array<string>(store.auth.loggedInUser.authId)
      } as IProject;
    }),
    tap(data => console.log('data in here is:', data)),
    switchMap((project: IProject) =>
      observableFrom(this.projectService.createProject(project)).pipe(
        mergeMap(() => {
          console.log('data after project created:', project);
          return [
            new ProjectActions.CreateProjectComplete(project)
            // new UserActions.CreateUser({})
            // TODO: Update logged in user's User.createdProject value
          ];
        }),
        catchError(err => {
          console.error('error: ', err);
          return observableOf(new ProjectActions.ProjectErrors(err));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  getProject$ = this.actions$.pipe(
    ofType(ProjectActions.ProjectActionTypes.GET_PROJECT),
    map((action: ProjectActions.GetProject) => action.payload),
    tap(projectID => console.log('project id is:', projectID)),
    switchMap((projectID: string) =>
      observableFrom(this.projectService.getProject(projectID)).pipe(
        map(data => {
          console.log('data jdlajd is', data);
        }),
        catchError(err => {
          console.error('error: ', err);
          return observableOf(new ProjectActions.ProjectErrors(err));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private projectService: ProjectService
  ) {}
}
