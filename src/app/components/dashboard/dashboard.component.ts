import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userList: Observable<IUser[]>;

  constructor(
    public commonService: CommonService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromApp.GetRecentUsers());
    this.userList = this.store.select(fromApp.getRecentUsers);
  }

  onCreateProjectModal() {
    this.commonService.openCreateProjectDialog();
  }

  onFindProjectModal() {
    console.log('second action');
    // this.projectService.openCreateProjectDialog();
  }
}
