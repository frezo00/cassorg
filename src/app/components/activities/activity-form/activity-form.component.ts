import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppState, getGroups, Go } from '../../../store';
import { IGroup, IActivity } from '../../../models';
import { CreateActivityBegin } from '../store';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @Input() activity: IActivity;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  groups$: Observable<IGroup[]>;

  activityForm: FormGroup;
  title: FormControl;
  description: FormControl;
  date: FormControl;
  group: FormControl;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.groups$ = this.store.select(getGroups);
  }

  initForm(): void {
    this.title = new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.description = new FormControl('', Validators.maxLength(500));
    this.date = new FormControl(null, Validators.required);
    this.group = new FormControl(null, Validators.required);

    this.activityForm = this.fb.group({
      title: this.title,
      description: this.description,
      date: this.date,
      group: this.group
    });
  }

  onSubmit(): void {
    if (!!this.activity) {
      this.updateActivity();
    } else {
      this.createActivity();
    }
  }

  createActivity(): void {
    if (this.activityForm.valid) {
      /* const groupMembers = {};
      this.selectedMembers.value
        .map((m: IMember) => m.id)
        .forEach((mID: string) => {
          groupMembers[mID] = true;
        }); */
      const newActivity: IActivity = {
        title: this.title.value.trim(),
        description: this.description.value.trim(),
        date: this.date.value._d.toISOString(),
        group: this.group.value,
        dateCreated: new Date().toISOString()
      };
      this.store.dispatch(new CreateActivityBegin(newActivity));
      this.activityForm.reset();
    }
  }

  updateActivity(): void {}

  onCancel(): void {
    if (!!this.activity) {
      this.store.dispatch(new Go(`/activities/${this.activity.id}`));
    } else {
      this.store.dispatch(new Go('/activities'));
    }
  }

  getGroupData(): Observable<IGroup> {
    if (!!this.group.value) {
      return this.groups$.pipe(
        map((groups: IGroup[]) =>
          groups.find((group: IGroup) => this.group.value === group.id)
        )
      );
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
