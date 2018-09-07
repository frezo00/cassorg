import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { AppState } from '../../store';
import { IMember, IProject } from '../../models';
import { ProjectService } from '../project/project.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MembersService {
  private membersCollection: AngularFirestoreCollection<IMember>;

  constructor(
    private afs: AngularFirestore,
    private store: Store<AppState>,
    private projectService: ProjectService
  ) {
    this.membersCollection = this.afs.collection<IMember>(
      `projects/${this.projectService.projectId}/members`,
      ref => ref.orderBy('dateCreated', 'desc')
    );
  }

  getMembers(): Observable<IMember[]> {
    return this.membersCollection.snapshotChanges().pipe(
      map(members =>
        members.map(u => {
          const data = u.payload.doc.data() as IMember;
          const id = u.payload.doc.id;
          return { id, ...data } as IMember;
        })
      )
    );
  }

  createMember(newMember: IMember): Promise<any> {
    console.log('newmem', newMember);
    return this.membersCollection.add(newMember);
  }
}
