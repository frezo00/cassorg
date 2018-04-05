import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../../../store';
import { CreateProjectModalComponent } from '../../../project/create-project-modal/create-project-modal.component';
import { IProject } from '../../../../models';

@Component({
  selector: 'app-side-top-header',
  templateUrl: './side-top-header.component.html',
  styleUrls: ['../../navigation.scss']
})
export class SideTopHeaderComponent implements OnInit {

  projectForm: FormGroup;
  projectName: FormControl;
  project: Observable<IProject>;
  editProjectName: boolean;

  constructor(public dialog: MatDialog, private store: Store<fromApp.AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.initProjectForm();
    this.editProjectName = false;
    this.project = this.store.select(fromApp.getActiveProject);
    this.project.subscribe((proj: IProject) => {
      if (proj) {
        this.projectName.setValue(proj.name);
      }
      console.log('here i am!', proj);
    });
  }

  initProjectForm() {
    this.projectName = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.projectForm = this.fb.group({ projectName: this.projectName });
  }

  onCreateProject() {
    // this.store.dispatch(new fromApp.OpenCreateProjectModal());
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectModalComponent, {
      height: 'calc(100%-20vh)',
      panelClass: 'modal-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  saveProject() {
    console.log('projectName: ', this.projectName.value);
  }
}
