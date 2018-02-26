import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import * as ProjectActions from './project.actions';
import { IProject } from '../../../models';

@Injectable()
export class ProjectEffects {
  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(ProjectActions.ProjectActionTypes.CREATE_PROJECT),
    map((action: ProjectActions.CreateProject) => action.payload),
    tap(project => console.log('project is: ', project)),
    switchMap((project: IProject) =>
      Observable.fromPromise(
        this.afDB.collection('projects').add(project)
      ).pipe(
        map(data => {
          console.log('data: ', data);
          console.log('and project: ', project);
          return new ProjectActions.CreateProjectComplete(project);
        }),
        catchError(err => {
          console.error('error: ', err);
          return Observable.of(new ProjectActions.ProjectErrors(err));
        })
      )
    )
  );

  constructor(private actions$: Actions, private afDB: AngularFirestore) {}
}
