import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser, IUserLogin, IApplicant } from '../../models/user.model';
import { ProjectService } from '../project/project.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private afDB: AngularFirestore,
    private store: Store<fromApp.AppState>,
    public projectService: ProjectService
  ) {}

  getUserByAuthId(authId: string): Observable<IUser[]> {
    console.log('aut', authId);
    return this.afDB
      .collection<IUser>('users', ref => ref.where('authId', '==', authId))
      .valueChanges();
  }

  getApplicants(): Observable<IApplicant[]> {
    return this.afDB.collection<IApplicant>('applicants', ref =>
    ref.orderBy('dateCreated', 'desc')
  ).valueChanges();
  }

  createUser(user: IUser, authId: string) {
    const userRef = this.afDB
      .collection('users')
      .ref.where('authID', '==', authId);

    userRef.get().then(docSnapshot => {
      console.log('docSnapshot: ', docSnapshot);
      /* if (docSnapshot) {
          userRef.ref.onSnapshot((doc) => {
            // do stuff with the data
            console.log('doc data', doc);
          });
        } else {
          userRef.set({...}) // create the document
        } */
    });
    return this.afDB.collection('users').add(user);
  }

  /* createProjectUser(projectUser: IProjectUser, userID?: string): Promise<any> {
    const projectUserRef = this.afDB.collection(
      `projects/${projectUser.projectID}/users`
    );
    if (!!userID) {
      return projectUserRef.doc(userID).set(projectUser);
    }
    return projectUserRef.add(projectUser);
  } */

  checkIfUserExists(authId: string): Promise<any> {
    console.log('inserv auth id', authId);
    return this.afDB
      .collection('users')
      .doc(authId)
      .ref.get();
  }

  createUserAfterRegister(user: IUserLogin): Promise<any> {
    console.log('in serv data', user);
    return this.afDB.collection('users').add(user);
  }
}
