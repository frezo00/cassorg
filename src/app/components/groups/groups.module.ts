import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';

import { GroupsComponent } from './groups.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupFormComponent } from './group-form/group-form.component';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupListComponent,
    GroupDetailsComponent,
    GroupNewComponent,
    GroupEditComponent,
    GroupFormComponent
  ],
  imports: [CommonModule, SharedModule, CommonComponentsModule],
  exports: [],
  providers: []
})
export class GroupsModule {}
