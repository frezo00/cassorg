import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IActivity, IGroup } from '../../../models';
import { AppState, getGroups, Go } from '../../../store';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  @Input() activity: IActivity;
  @Input() groupId: string;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  groups$: Observable<IGroup[]>;
  groups: IGroup[] = [];
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _store: Store<AppState>, private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.initForm();
    this._store.select(getGroups).subscribe((groups: IGroup[]) => {
      this.groups = groups;
      console.log('subscribed', this.groups);
      this.groups.map((group: IGroup) => this._createGroupControl(group.id === this.groupId));
    });
  }

  initForm(): void {
    this.form = this._fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', Validators.maxLength(500)),
      datetime: this._fb.group({
        date: new FormControl(null, Validators.required),
        time: new FormControl(null, Validators.required)
      }),
      groups: new FormArray([])
    });
  }

  get groupArray(): FormArray {
    return <FormArray>this.form.get('groups');
  }

  private _createGroupControl(preselect?: boolean): void {
    return this.groupArray.push(new FormControl(preselect));
  }

  onSubmit(): void {
    console.log('submitted', this.form.value);
    // if (!!this.activity) {
    //   this.updateActivity();
    // } else {
    //   this.createActivity();
    // }
  }

  createActivity(): void {
    if (this.form.valid) {
      /* const groupMembers = {};
      this.selectedMembers.value
        .map((m: IMember) => m.id)
        .forEach((mID: string) => {
          groupMembers[mID] = true;
        }); */
      // const newActivity: IActivity = {
      //   title: this.title.value.trim(),
      //   description: this.description.value.trim(),
      //   date: this.datetime.value._d.toISOString(),
      //   group: this.groups.value,
      //   dateCreated: new Date().toISOString()
      // };
      // this._store.dispatch(new CreateActivityBegin(newActivity));
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

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
