import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IApplicant } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {
  private applicantsCollection: AngularFirestoreCollection<IApplicant>;

  constructor(private afs: AngularFirestore) {
    this.applicantsCollection = this.afs.collection<IApplicant>('applicants');
  }

  getApplicants(): Observable<IApplicant[]> {
    return this.afs
      .collection<IApplicant>('applicants', ref =>
        ref.orderBy('dateCreated', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(applicants =>
          applicants.map(a => {
            const data = a.payload.doc.data() as IApplicant;
            const id = a.payload.doc.id;
            return { id, ...data } as IApplicant;
          })
        )
      );
  }

  getApplicantById(id: string): Promise<any> {
    return this.applicantsCollection.doc<IApplicant>(id).ref.get();
  }

  updateApplicant(id: string): Promise<void> {
    return this.applicantsCollection
      .doc<IApplicant>(id)
      .ref.update({ isMember: true });
  }
}
