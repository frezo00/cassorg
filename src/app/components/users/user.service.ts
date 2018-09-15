import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser, IUserLogin, IApplicant, IMember } from '../../models';
import { ProjectService } from '../project/project.service';
import { Store } from '@ngrx/store';

import { AppState, getActiveProject } from '../../store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProject } from '../../models';

@Injectable()
export class UsersService {
  constructor(
    private afDB: AngularFirestore,
    private store: Store<AppState>,
    public projectService: ProjectService
  ) {}

  getUserByAuthId(authId: string): Observable<IUser[]> {
    return this.afDB
      .collection<IUser>('users', ref => ref.where('authId', '==', authId))
      .snapshotChanges()
      .pipe(
        map(users =>
          users.map(u => {
            const data = u.payload.doc.data() as IUser;
            const id = u.payload.doc.id;
            return { id, ...data } as IUser;
          })
        )
      );
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
