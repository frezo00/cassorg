import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups.routing';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupListComponent,
    GroupDetailsComponent,
    GroupNewComponent,
    GroupEditComponent,
    GroupFormComponent
  ],
  imports: [CommonModule, GroupsRoutingModule, SharedModule, CommonComponentsModule],
  exports: [],
  providers: []
})
export class GroupsModule {}
