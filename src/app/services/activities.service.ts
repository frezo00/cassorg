import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IActivity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private afs: AngularFirestore) {}

  getActivities(projectId: string): Observable<IActivity[]> {
    return this.afs
      .collection<IActivity>(`projects/${projectId}/activities`, ref =>
        ref.orderBy('date', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map((activities: any) =>
          activities.map(g => {
            const data = g.payload.doc.data() as IActivity;
            const id = g.payload.doc.id;
            return { id, ...data } as IActivity;
          })
        )
      );
  }

  createActivity(newActivity: IActivity, projectId: string): Promise<any> {
    return this.afs
      .collection<IActivity>(`projects/${projectId}/activities`, ref =>
        ref.orderBy('date', 'desc')
      )
      .add(newActivity);
  }
}
