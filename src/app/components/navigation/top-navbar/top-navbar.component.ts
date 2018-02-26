import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../../store';
import { IUser, IProject } from '../../../models';
import { MatDialog } from '@angular/material';
import { CreateProjectModalComponent } from './../../project/create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  @Output() toggleSide = new EventEmitter();
  @Input() isMobile: any;
  user: Observable<IUser>;
  project: Observable<IProject>;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.store.select(fromApp.getLoggedInUser);
    this.project = this.store.select(fromApp.getActiveProject);
  }

  toggleSidenav() {
    this.toggleSide.emit();
  }

  onCreateProject() {
    // this.store.dispatch(new fromApp.OpenCreateProjectModal());
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectModalComponent, {
      // width: '250px'
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  logout() {
    this.store.dispatch(new fromApp.Logout());
  }
}
