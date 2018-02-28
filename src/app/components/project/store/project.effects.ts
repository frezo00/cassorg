import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {
  map,
  switchMap,
  mergeMap,
  tap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

import * as ProjectActions from './project.actions';
import { IProject, Project } from '../../../models';
import { AppState } from '../../../store';

@Injectable()
export class ProjectEffects {
  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectActions.ProjectActionTypes.CREATE_PROJECT),
    withLatestFrom(this.store$),
    map(([action, store]: [ProjectActions.CreateProject, AppState]) => {
      return {
        name: action.payload.name,
        createdBy: store.auth.loggedInUser.id
      } as IProject;
    }),
    switchMap((project: IProject) =>
      Observable.fromPromise(
        this.afDB.collection('projects').add(project)
      ).pipe(
        mergeMap(data => [
          new ProjectActions.CreateProjectComplete({ ...project, id: data.id })
          // TODO: Update logged in user's User.createdProject value
        ]),
        catchError(err => {
          console.error('error: ', err);
          return Observable.of(new ProjectActions.ProjectErrors(err));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private afDB: AngularFirestore,
    private store$: Store<AppState>
  ) {}
}
