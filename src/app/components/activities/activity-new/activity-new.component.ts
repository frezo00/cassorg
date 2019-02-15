import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activity-new',
  template: `
    <div class="activity-new__container">
      <app-subheader
        [title]="'Nova aktivnost'"
        [subtitle]="'Dodaj novu aktivnost'"
        [showBackButton]="true"
        [backButtonLink]="'/activities'"
      ></app-subheader>
      <div class="activity-new__content mat-elevation-z8">
        <app-activity-form></app-activity-form>
      </div>
    </div>
  `,
  styleUrls: ['./activity-new.component.scss']
})
export class ActivityNewComponent implements OnInit {
  @ViewChild(ActivityFormComponent) form: ActivityFormComponent;

  constructor() {}

  ngOnInit() {}
}
