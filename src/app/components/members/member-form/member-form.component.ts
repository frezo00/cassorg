import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Validators } from '../../common/validators';

import { AppState, CreateMemberBegin } from '../../../store';
import { IMember } from '../../../models';

import * as moment from 'moment';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  @Input()
  member: IMember;

  memberForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  birthdate: FormControl;
  phoneNumber: FormControl;
  gender: FormControl;
  parents: FormControl;
  email: FormControl;
  address: FormControl;
  photoURL: FormControl;
  note: FormControl;
  siblings: FormControl;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.initForm();
    if (!!this.member) {
      console.log('mem', this.member);
      this.setFormData(this.member);
    }
  }

  initForm(): void {
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
    this.photoURL = new FormControl('');
    this.note = new FormControl('', Validators.maxLength(500));
    this.siblings = new FormControl(null);

    this.memberForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      phoneNumber: this.phoneNumber,
      parents: this.parents,
      gender: this.gender,
      email: this.email,
      address: this.address,
      photoURL: this.photoURL,
      note: this.note,
      siblings: this.siblings
    });
  }

  setFormData(member: IMember): void {
    this.firstName.setValue(member.firstName);
    this.lastName.setValue(member.lastName);
    this.birthdate.setValue(moment(member.birthdate));
    this.phoneNumber.setValue(member.phoneNumber);
    this.gender.setValue(member.gender);
    this.parents.setValue(member.parents);
    this.email.setValue(member.email);
    this.address.setValue(member.address);
    this.photoURL.setValue(member.photoURL);
    this.note.setValue(member.note);
    this.siblings.setValue(member.siblings);
  }

  onSubmit() {
    const memberData = {
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
      photoURL: !!this.photoURL.value ? this.photoURL.value : null,
      note: !!this.note.value ? this.note.value.trim() : '',
      siblings: !!this.siblings.value ? this.siblings.value : null,
      applicantId: !!this.member ? this.member.applicantId : ''
    } as IMember;
    this.store.dispatch(new CreateMemberBegin(memberData));
  }

  onCancel() {
    console.log('cancel');
  }
}
