import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProjectState } from '../../../store/reducers';
import { CreateProject } from '../../../store/actions';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {
  isLinear = false;
  showInfo = false;
  projectForm: FormGroup;
  projectTag: FormControl;
  projectName: FormControl;
  categoryForm: FormGroup;
  categoryArray: FormArray;

  constructor(private fb: FormBuilder, private store: Store<ProjectState>) {}

  ngOnInit() {
    this.initProjectForm();
    this.initCategoryForm();
  }

  initProjectForm() {
    this.projectName = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]);
    this.projectTag = new FormControl('', Validators.required);
    this.projectForm = this.fb.group({ name: this.projectName });
  }

  initCategoryForm() {
    this.categoryArray = this.fb.array(
      [this.categoryGroupName()],
      Validators.compose([Validators.required, Validators.maxLength(3)])
    );
    this.categoryForm = this.fb.group({
      categories: this.categoryArray
    });
  }

  categoryGroupName(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      isFavourite: new FormControl(false)
    });
  }

  setFavouriteCategory(category: FormControl) {
    category.setValue(!category.value);
  }

  getProjectTagName(): string {
    return this.projectName.value
      .toLowerCase()
      .trim()
      .replace(/ /g, '');
  }

  onSubmit() {
    console.log('project form: ', this.projectForm.value);
    if (this.projectForm.valid) {
      this.store.dispatch(
        new CreateProject({
          name: this.projectName.value.trim(),
          tag: this.getProjectTagName()
        })
      );
    }
    // console.log('category form: ', this.categoryForm.controls);
  }

  getProjectErrorMessage() {
    return this.projectName.hasError('required')
      ? 'Please, enter a value'
      : this.projectName.hasError('maxlength')
      ? 'Maximum name length is 20 characters'
      : '';
  }

  getCategoryErrorMessage(category: FormControl) {
    return category.hasError('required')
      ? 'Please, enter a value'
      : category.hasError('maxlength')
      ? 'Maximum name length is 20 characters'
      : '';
  }
}
