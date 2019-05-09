import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppState } from '../store';
import { IProject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectId: string;

  constructor(private afDB: AngularFirestore, private store: Store<AppState>) {
    this.store
      .select(state => state.project.activeProject)
      .subscribe((project: IProject) => {
        if (!!project) {
          this.projectId = project.tag;
        }
      });
  }

  createProject(project: IProject): Promise<void> {
    return this.afDB
      .collection('projects')
      .doc(project.tag)
      .set(project);
  }

  getProject(projectId: string): Promise<any> {
    return this.afDB
      .collection('projects')
      .doc(projectId)
      .ref.get();
  }
}
