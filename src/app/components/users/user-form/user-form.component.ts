import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { User, IUser, IProjectUser } from '../../../models';
import * as fromStore from '../store';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  birthdate: FormControl;
  address: FormControl;
  gender: FormControl;
  role: FormControl;
  email: FormControl;
  phoneNumber: FormControl;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.UsersState>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.birthdate = new FormControl('');
    this.address = new FormControl('');
    this.gender = new FormControl('');
    this.role = new FormControl('');
    this.email = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    );
    this.phoneNumber = new FormControl('');

    this.userForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      address: this.address,
      gender: this.gender,
      role: this.role,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }

  onSubmit() {
    console.log('form is: ', this.userForm.value);
    const displayName =
      this.userForm.value.firstName + ' ' + this.userForm.value.lastName;

    const { role, ...newUser } = this.userForm.value;
    const userWithDN = { ...newUser, displayName };
    const createUserData = { user: userWithDN as IUser, role };

    console.log('new user: ', newUser);
    console.log('user with dn: ', userWithDN);
    console.log('role: ', role);
    console.log('projectUser: ', createUserData);
    // this.store.dispatch(new fromStore.CreateProjectUser(createUserData as IUser));
  }
}
