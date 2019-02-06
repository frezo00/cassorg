import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IGroup, IMember } from '../../../models';
import {
  AppState,
  CreateGroupBegin,
  getMembers,
  getGroupMembers,
  UpdateGroupBegin,
  Go
} from '../../../store';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  @Input() group: IGroup;
  groupForm: FormGroup;
  name: FormControl;
  color: FormControl;
  selectedMembers: FormControl;
  members: Observable<IMember[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForm();
    if (!!this.group) {
      this.setFormData(this.group);
    }
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

  setFormData(group: IGroup): void {
    this.name.setValue(group.name);
    this.color.setValue(group.color);
    this.store
      .select(getGroupMembers(group.members))
      .subscribe((groupMembers: IMember[]) =>
        this.selectedMembers.setValue(groupMembers)
      );
  }

  onSubmit(): void {
    if (!!this.group) {
      this.updateMember();
    } else {
      this.createMember();
    }
  }

  updateMember(): void {
    if (
      this.groupForm.valid &&
      (!!this.groupForm.dirty || !!this.groupForm.touched)
    ) {
      const groupMembers = {};
      this.selectedMembers.value
        .map((m: IMember) => m.id)
        .forEach((mID: string) => {
          groupMembers[mID] = true;
        });
      const editGroupData: IGroup = {
        ...this.group,
        lastUpdated: new Date().toISOString(),
        name:
          !!this.name.valid && (!!this.name.dirty || !!this.name.touched)
            ? this.name.value.trim()
            : this.group.name,
        color:
          !!this.color.valid && (!!this.color.dirty || !!this.color.touched)
            ? this.color.value.trim()
            : this.group.color,
        members:
          !!this.selectedMembers.valid &&
          !!this.selectedMembers.value &&
          (!!this.selectedMembers.dirty || !!this.selectedMembers.touched)
            ? groupMembers
            : this.group.members
      };
      const { id, ...groupData } = editGroupData;
      this.store.dispatch(new UpdateGroupBegin({ id, groupData }));
      this.groupForm.reset();
    }
  }

  createMember(): void {
    if (this.groupForm.valid) {
      const groupMembers = {};
      this.selectedMembers.value
        .map((m: IMember) => m.id)
        .forEach((mID: string) => {
          groupMembers[mID] = true;
        });
      const newGroupData: IGroup = {
        name: this.name.value.trim(),
        color: this.color.value,
        dateCreated: new Date().toISOString(),
        members: !!this.selectedMembers.value ? groupMembers : null
      };
      this.store.dispatch(new CreateGroupBegin(newGroupData));
      this.groupForm.reset();
    }
  }

  onCancel(): void {
    if (!!this.group) {
      this.store.dispatch(new Go(`/groups/${this.group.id}`));
    } else {
      this.store.dispatch(new Go(`/groups`));
    }
  }
}
