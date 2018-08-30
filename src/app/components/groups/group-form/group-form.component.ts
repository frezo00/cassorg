import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  name: FormControl;
  color: FormControl;
  users: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.name = new FormControl('', Validators.required);
    this.color = new FormControl('', Validators.required);
    this.users = new FormControl(null);
    this.groupForm = this.fb.group({
      name: this.name,
      color: this.color,
      users: this.users
    });
  }

  onSubmit(): void {
    console.log(this.groupForm.value);
  }
}
