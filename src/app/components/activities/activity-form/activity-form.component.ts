import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IActivity, IGroup } from '../../../models';
import { AppState, CreateActivityBegin, getGroups, Go } from '../../../store';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @Input() activity: IActivity;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  groups$: Observable<IGroup[]>;

  form: FormGroup;
  title: FormControl;
  description: FormControl;
  datetime: FormGroup;
  groups: FormArray;

  constructor(private _fb: FormBuilder, private _store: Store<AppState>, private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.initForm();
    this.groups$ = this._store.select(getGroups);
  }

  initForm(): void {
    this.title = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.description = new FormControl('', Validators.maxLength(500));
    this.datetime = this._fb.group({
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required)
    });
    this.groups = new FormArray([]);

    this.form = this._fb.group({
      title: this.title,
      description: this.description,
      datetime: this.datetime,
      groups: this.groups
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
    if (this.form.valid) {
      /* const groupMembers = {};
      this.selectedMembers.value
        .map((m: IMember) => m.id)
        .forEach((mID: string) => {
          groupMembers[mID] = true;
        }); */
      const newActivity: IActivity = {
        title: this.title.value.trim(),
        description: this.description.value.trim(),
        date: this.datetime.value._d.toISOString(),
        group: this.groups.value,
        dateCreated: new Date().toISOString()
      };
      this._store.dispatch(new CreateActivityBegin(newActivity));
      this.form.reset();
    }
  }

  updateActivity(): void {}

  onCancel(): void {
    if (!!this.activity) {
      this._store.dispatch(new Go(`/activities/${this.activity.id}`));
    } else {
      this._store.dispatch(new Go('/activities'));
    }
  }

  getGroupData(): Observable<IGroup> {
    if (!!this.groups.value) {
      return this.groups$.pipe(
        map((groups: IGroup[]) => groups.find((group: IGroup) => this.groups.value === group.id))
      );
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
