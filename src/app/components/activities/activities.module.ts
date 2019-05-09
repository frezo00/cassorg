import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';

import { ActivitiesComponent } from './activities.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityListComponent,
    ActivityNewComponent,
    ActivityFormComponent
  ],
  imports: [CommonModule, SharedModule, CommonComponentsModule],
  exports: [],
  providers: []
})
export class ActivitiesModule {}
