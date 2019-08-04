import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities.routing';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityListComponent,
    ActivityNewComponent,
    ActivityFormComponent
  ],
  imports: [CommonModule, ActivitiesRoutingModule, SharedModule, CommonComponentsModule],
  exports: [ActivityFormComponent],
  providers: []
})
export class ActivitiesModule {}
