import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IApplicant, IGroup, IMember } from '../../../models';
import {
  getApplicants,
  AppState,
  OpenModal,
  GetApplicantsBegin,
  CreateGroupBegin,
  GetMembersBegin,
  getMembers
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
  selectedMembers: FormControl;
  members: Observable<IMember[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.initForm();
    this.store.dispatch(new GetMembersBegin());
    this.members = this.store.select(getMembers);
  }

  initForm(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]);
    this.color = new FormControl('#000000', Validators.required);
    this.selectedMembers = new FormControl(null);
    this.groupForm = this.fb.group({
      name: this.name,
      color: this.color,
      selectedMembers: this.selectedMembers
    });
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      let memberIDs: string[] = null;
      if (!!this.selectedMembers.value) {
        memberIDs = this.selectedMembers.value.map(user => user.id);
      }
      const newGroupData: IGroup = {
        name: this.name.value.trim(),
        color: this.color.value,
        dateCreated: new Date().toISOString(),
        members: memberIDs
      };
      this.store.dispatch(new CreateGroupBegin(newGroupData));
      this.groupForm.reset();
    }
  }

  onCancel() {
    this.store.dispatch(new OpenModal(false));
  }
}
