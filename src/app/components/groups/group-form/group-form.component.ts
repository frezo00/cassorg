import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IApplicant, IGroup } from '../../../models';
import {
  getApplicants,
  AppState,
  OpenModal,
  GetApplicantsBegin,
  CreateGroupBegin
} from '../../../store';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  name: FormControl;
  color: FormControl;
  selectedUsers: FormControl;
  applicants: Observable<IApplicant[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.initForm();
    this.store.dispatch(new GetApplicantsBegin());
    this.applicants = this.store.select(getApplicants);
  }

  initForm(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]);
    this.color = new FormControl('#000000', Validators.required);
    this.selectedUsers = new FormControl(null);
    this.groupForm = this.fb.group({
      name: this.name,
      color: this.color,
      selectedUsers: this.selectedUsers
    });
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      let userIDs: string[] = null;
      if (!!this.selectedUsers.value) {
        userIDs = this.selectedUsers.value.map(user => user.id);
      }
      const newGroupData: IGroup = {
        name: this.name.value.trim(),
        color: this.color.value,
        dateCreated: new Date().toISOString(),
        users: userIDs
      };
      this.store.dispatch(new CreateGroupBegin(newGroupData));
      this.groupForm.reset();
    }
  }

  onCancel() {
    this.store.dispatch(new OpenModal(false));
  }
}
