import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { IMember } from '../../models';
import { ProjectService } from '../project/project.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MembersService {
  constructor(private afs: AngularFirestore) {}

  getMembers(projectId: string): Observable<IMember[]> {
    return this.afs
      .collection<IMember>(`projects/${projectId}/members`, ref =>
        ref.orderBy('dateCreated', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(members =>
          members.map(u => {
            const data = u.payload.doc.data() as IMember;
            const id = u.payload.doc.id;
            return { id, ...data } as IMember;
          })
        )
      );
  }

  createMember(newMember: IMember, projectId: string): Promise<any> {
    return this.afs
      .collection<IMember>(`projects/${projectId}/members`, ref =>
        ref.orderBy('dateCreated', 'desc')
      )
      .add(newMember);
  }

  getMember(memberId: string, projectId: string): Promise<any> {
    console.log('pid', projectId, 'memid', memberId);
    return this.afs
      .doc<IMember>(`projects/${projectId}/members/${memberId}`)
      .ref.get();
  }
}
