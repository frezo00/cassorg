import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { IMember } from '../../models';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { UpdateMemberProfileImageBegin } from './store/members.actions';

@Injectable()
export class MembersService {
  imageUploadPercent$: Observable<number>;
  tempProfileImage: File;

  constructor(
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private store: Store<AppState>
  ) {}

  getMembers(projectId: string): Observable<IMember[]> {
    return this.af
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
    return this.af
      .collection<IMember>(`projects/${projectId}/members`, ref =>
        ref.orderBy('dateCreated', 'desc')
      )
      .add(newMember);
  }

  getMember(memberId: string, projectId: string): Promise<any> {
    return this.af
      .doc<IMember>(`projects/${projectId}/members/${memberId}`)
      .ref.get();
  }

  updateMember(
    memberId: string,
    memberData: IMember,
    projectId: string
  ): Promise<void> {
    return this.af
      .doc<IMember>(`projects/${projectId}/members/${memberId}`)
      .ref.set(memberData);
  }

  uploadProfileImage(memberId: string, projectId: string) {
    const filePath = `${projectId}/profileImages/${memberId}`;

    const metadata = {
      contentType: this.tempProfileImage.type,
      cacheControl: 'public, max-age=31536000'
    };

    const ref = this.afs.ref(filePath);
    // this.imageUploadPercent$ = task.percentageChanges();

    return ref
      .put(this.tempProfileImage, metadata)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.tempProfileImage = null;
          return ref.getDownloadURL().subscribe(url => {
            this.store.dispatch(
              new UpdateMemberProfileImageBegin({
                id: memberId,
                photoURL: url
              })
            );
          });
        })
      );
  }

  updateMemberProfileImage(
    memberId: string,
    photoURL: string,
    projectId: string
  ): Promise<void> {
    return this.af
      .doc<IMember>(`projects/${projectId}/members/${memberId}`)
      .ref.update({ photoURL: photoURL });
  }

  saveTempImage(image: File): void {
    this.tempProfileImage = image;
  }
}
