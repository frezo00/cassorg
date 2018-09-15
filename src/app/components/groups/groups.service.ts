import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IGroup } from '../../models';

@Injectable()
export class GroupsService {
  private groupsCollection: AngularFirestoreCollection<IGroup>;

  constructor(private afs: AngularFirestore) {
    this.groupsCollection = this.afs.collection<IGroup>('groups');
  }

  getGroups(): Observable<IGroup[]> {
    return this.groupsCollection.valueChanges();
  }

  createGroup(groupData: IGroup): Promise<any> {
    return this.groupsCollection.add(groupData);
  }
}
