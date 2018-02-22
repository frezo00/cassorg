import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/user.model';
import { ProjectService } from '../project/project.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store';

@Injectable()
export class UsersService {
  constructor(
    private afDB: AngularFirestore,
    private store: Store<fromApp.AppState>,
    public projectService: ProjectService
  ) {}

  createUser(user: IUser) {
    return this.afDB
      .collection('projects/myproject/categories/category1/users')
      .add(user);
  }
}
