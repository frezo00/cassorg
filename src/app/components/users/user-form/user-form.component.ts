import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  gender: FormControl;
  email: FormControl;
  phoneNumber: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.birthdate = new FormControl('');
    this.gender = new FormControl('');
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.phoneNumber = new FormControl('');

    this.userForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      gender: this.gender,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }

  onSubmit() {
    console.log('form is: ', this.userForm.value);
  }
}
