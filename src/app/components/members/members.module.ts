import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';

import { MembersComponent } from './members.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberNewComponent } from './member-new/member-new.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberImageComponent } from './member-form/member-image/member-image.component';
import { MemberGroupsComponent } from './member-profile/member-groups/member-groups.component';
import { MemberInfoComponent } from './member-profile/member-info/member-info.component';

@NgModule({
  declarations: [
    MembersComponent,
    MemberListComponent,
    MemberProfileComponent,
    MemberNewComponent,
    MemberEditComponent,
    MemberFormComponent,
    MemberImageComponent,
    MemberGroupsComponent,
    MemberInfoComponent
  ],
  imports: [CommonModule, SharedModule, CommonComponentsModule],
  exports: [MemberFormComponent],
  providers: []
})
export class MembersModule {}
