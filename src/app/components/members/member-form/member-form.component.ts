import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Validators } from '../../common/validators';

import {
  AppState,
  CreateMemberBegin,
  UpdateMemberBegin,
  getMembers,
  getAllMembersExceptOne,
  getGroups,
  getMemberGroups,
  Go
} from '../../../store';
import { IMember, IGroup } from '../../../models';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  @Input() member: IMember;
  @Input() isApplicant = false;
  siblings$: Observable<IMember[]>;
  groups$: Observable<IGroup[]>;
  memberGroupsIDs: string[];
  photoURL: any;

  memberForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  birthdate: FormControl;
  phoneNumber: FormControl;
  gender: FormControl;
  parents: FormControl;
  email: FormControl;
  address: FormControl;
  note: FormControl;
  siblings: FormControl;
  groups: FormControl;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private membersService: MembersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (!!this.member) {
      this.setFormData(this.member);
    }
    this.groups$ = this.store.select(getGroups);
  }

  initForm(): void {
    this.membersService.tempProfileImage = null;
    this.siblings$ = this.store.select(getMembers);

    this.firstName = new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.maxLength(30)
    ]);
    this.birthdate = new FormControl(null, Validators.required);
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.phoneNumber
    ]);
    this.parents = new FormControl('', Validators.maxLength(40));
    this.gender = new FormControl(null);
    this.email = new FormControl('', [
      Validators.email,
      Validators.maxLength(40)
    ]);
    this.address = new FormControl('', Validators.maxLength(100));
    this.note = new FormControl('', Validators.maxLength(500));
    this.siblings = new FormControl(null);
    this.groups = new FormControl(null);

    this.memberForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      phoneNumber: this.phoneNumber,
      parents: this.parents,
      gender: this.gender,
      email: this.email,
      address: this.address,
      note: this.note,
      siblings: this.siblings,
      groups: this.groups
    });
  }

  setFormData(member: IMember): void {
    this.siblings$ = this.store.select(getAllMembersExceptOne(this.member.id));
    this.store
      .select(getMemberGroups(member.id))
      .subscribe((groups: IGroup[]) => {
        this.memberGroupsIDs = groups.map((g: IGroup) => g.id);
        this.groups.setValue(this.memberGroupsIDs);
      });

    this.firstName.setValue(member.firstName);
    this.lastName.setValue(member.lastName);
    this.birthdate.setValue(moment(member.birthdate));
    this.phoneNumber.setValue(member.phoneNumber);
    this.gender.setValue(member.gender);
    this.parents.setValue(member.parents);
    this.email.setValue(member.email);
    this.address.setValue(member.address);
    this.note.setValue(member.note);
    this.siblings.setValue(member.siblings);
  }

  onSubmit(): void {
    if (!!this.member && !this.isApplicant) {
      this.updateMember();
    } else {
      this.createMember();
    }
  }

  createMember(): void {
    const newMemberData = {
      dateCreated: new Date().toISOString(),
      firstName: this.firstName.value.trim(),
      lastName: this.lastName.value.trim(),
      birthdate: !!this.birthdate.value
        ? this.birthdate.value._d.toISOString()
        : '',
      phoneNumber: this.phoneNumber.value.trim(),
      gender: !!this.gender.value ? this.gender.value : null,
      parents: !!this.parents.value ? this.parents.value.trim() : '',
      email: !!this.email.value ? this.email.value.trim() : '',
      address: !!this.address.value ? this.address.value.trim() : '',
      note: !!this.note.value ? this.note.value.trim() : '',
      siblings: !!this.siblings.value ? this.siblings.value : null,
      applicantId: !!this.member ? this.member.applicantId : ''
    } as IMember;

    this.memberGroupsIDs = !!this.groups.value ? this.groups.value : null;
    const memberGroups: { [id: string]: boolean } = {};
    this.memberGroupsIDs.forEach((gID: string) => (memberGroups[gID] = true));

    this.store.dispatch(
      new CreateMemberBegin({
        member: newMemberData,
        hasImage: !!this.membersService.tempProfileImage,
        memberGroups: memberGroups
      })
    );
  }

  updateMember(): void {
    if (
      !!this.membersService.tempProfileImage ||
      (!!this.memberForm.valid &&
        (!!this.memberForm.dirty || !!this.memberForm.touched))
    ) {
      const editMemberData = {
        ...this.member,
        lastUpdated: new Date().toISOString(),
        firstName:
          !!this.firstName.valid &&
          (!!this.firstName.dirty || !!this.firstName.touched)
            ? this.firstName.value.trim()
            : this.member.firstName,
        lastName:
          !!this.lastName.valid &&
          (!!this.lastName.dirty || !!this.lastName.touched)
            ? this.lastName.value.trim()
            : this.member.lastName,
        birthdate:
          !!this.birthdate.valid &&
          (!!this.birthdate.dirty || !!this.birthdate.touched)
            ? moment(this.birthdate.value).toISOString()
            : moment(this.member.birthdate).toISOString(),
        phoneNumber:
          !!this.phoneNumber.valid &&
          (!!this.phoneNumber.dirty || !!this.phoneNumber.touched)
            ? this.phoneNumber.value.trim()
            : this.member.phoneNumber,
        gender:
          !!this.gender.valid && (!!this.gender.dirty || !!this.gender.touched)
            ? this.gender.value
            : this.member.gender,
        parents:
          !!this.parents.valid &&
          (!!this.parents.dirty || !!this.parents.touched)
            ? this.parents.value.trim()
            : this.member.parents,
        email:
          !!this.email.valid && (!!this.email.dirty || !!this.email.touched)
            ? this.email.value.trim()
            : this.member.email,
        address:
          !!this.address.valid &&
          (!!this.address.dirty || !!this.address.touched)
            ? this.address.value.trim()
            : this.member.address,
        note:
          !!this.note.valid && (!!this.note.dirty || !!this.note.touched)
            ? this.note.value.trim()
            : this.member.note,
        siblings:
          !!this.siblings.valid &&
          (!!this.siblings.dirty || !!this.siblings.touched)
            ? this.siblings.value
            : this.member.siblings
      } as IMember;

      const memberGroups: { [id: string]: boolean } = {};
      if (
        !!this.groups.value &&
        (!!this.groups.dirty || !!this.groups.touched)
      ) {
        this.groups.value.forEach((gId: string) => (memberGroups[gId] = true));
        this.memberGroupsIDs
          .filter((gID: string) => !this.groups.value.includes(gID))
          .forEach((gId: string) => (memberGroups[gId] = false));
      }

      const { id, ...memberData } = editMemberData;
      this.store.dispatch(
        new UpdateMemberBegin({
          id,
          memberData,
          hasImage: !!this.membersService.tempProfileImage,
          memberGroups: !!memberGroups ? memberGroups : null
        })
      );
    } else {
      this.onCancel();
    }
  }

  onCancel(): void {
    if (!!this.member) {
      this.store.dispatch(new Go(`/members/${this.member.id}`));
    } else {
      this.store.dispatch(new Go('/members'));
    }
  }

  onImageChange(profileImage: File): void {
    console.log('profileImage', profileImage);
    this.membersService.saveTempImage(profileImage);
  }

  getSiblingsData(): Observable<IMember[]> {
    if (!!this.siblings.value) {
      return this.siblings$.pipe(
        map((siblings: IMember[]) =>
          siblings.filter((sibling: IMember) =>
            this.siblings.value.find((s: string) => s === sibling.id)
          )
        )
      );
    }
  }
  getGroupsData(): Observable<IGroup[]> {
    if (!!this.groups.value) {
      return this.groups$.pipe(
        map((groups: IGroup[]) =>
          groups.filter((group: IGroup) =>
            this.groups.value.find((g: string) => g === group.id)
          )
        )
      );
    }
  }
}
