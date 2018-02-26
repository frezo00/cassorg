import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {
  isLinear = false;
  projectForm: FormGroup;
  projectName: FormControl;
  categoryForm: FormGroup;
  categoryName: FormControl;
  categoryArray: FormArray;
  names: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initProjectForm();
    this.initCategoryForm();
  }

  initProjectForm() {
    this.projectName = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.projectForm = this.fb.group({ name: this.projectName });
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      names: this.fb.array([this.addGroupName()])
    });
    /* this.categoryName = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.categoryForm = this.fb.group({
      name: this.categoryName
    }); */
  }

  addGroupName(): FormGroup {
    return this.fb.group({ name: this.categoryName });
  }

  addItem(): void {
    this.names = this.categoryForm.get('names') as FormArray;
    this.names.push(this.addGroupName());
  }

  onSubmitForms() {
    console.log('project form: ', this.projectForm.value);
    console.log('category form: ', this.categoryForm.value);
  }

  getProjectErrorMessage() {
    return this.projectName.hasError('required')
      ? 'You must enter a value'
      : this.projectName.hasError('maxlength')
        ? 'Maximum name length is 20 characters'
        : '';
  }

  getCategoryErrorMessage() {
    return this.categoryName.hasError('required')
      ? 'You must enter a value'
      : this.categoryName.hasError('maxlength')
        ? 'Maximum name length is 20 characters'
        : '';
  }
}
