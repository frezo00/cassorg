import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IGroup, IMember } from '../../models';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupsService {
  // private groupsCollection: AngularFirestoreCollection<IGroup>;

  constructor(private afs: AngularFirestore) {
    // this.groupsCollection = this.afs.collection<IGroup>('groups');
  }

  getGroups(projectId: string): Observable<IGroup[]> {
    // return this.groupsCollection.valueChanges();
    return this.afs
      .collection<IGroup>(`projects/${projectId}/groups`, ref =>
        ref.orderBy('dateCreated', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(groups =>
          groups.map(g => {
            const data = g.payload.doc.data() as IGroup;
            const id = g.payload.doc.id;
            return { id, ...data } as IGroup;
          })
        )
      );
  }

  createGroup(newGroup: IGroup, projectId: string): Promise<any> {
    return this.afs
      .collection<IGroup>(`projects/${projectId}/groups`, ref =>
        ref.orderBy('dateCreated', 'desc')
      )
      .add(newGroup);
  }

  updateGroup(
    groupId: string,
    groupData: IGroup,
    projectId: string
  ): Promise<void> {
    return this.afs
      .doc<IGroup>(`projects/${projectId}/groups/${groupId}`)
      .ref.set(groupData);
  }

  updateGroupMembers(
    groupId: string,
    memberObj: { mId: string; set: boolean },
    projectId: string
  ): Promise<void> {
    return this.afs
      .doc<IMember>(`projects/${projectId}/groups/${groupId}`)
      .ref.update({ [`members.${memberObj.mId}`]: memberObj.set });
  }
}
