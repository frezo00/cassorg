import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../../../store';
import { IProject } from '../../../../models';
import { CommonService } from '../../../common/common.service';

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

  constructor(
    public commonService: CommonService,
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder
  ) {}

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
    this.commonService.openCreateProjectDialog();
  }

  saveProject() {
    console.log('projectName: ', this.projectName.value);
  }
}
