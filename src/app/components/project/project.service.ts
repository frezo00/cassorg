import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';

import { IProject } from '../../models';

@Injectable()
export class ProjectService {
  constructor(public dialog: MatDialog, private afDB: AngularFirestore) {}

  createProject(project: IProject): Promise<any> {
    // return this.afDB.collection('projects').add(project);
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
