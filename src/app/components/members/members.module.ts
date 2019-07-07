import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';
import { NavigationsModule } from '../navigations/navigations.module';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberImageComponent } from './member-form/member-image/member-image.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberNewComponent } from './member-new/member-new.component';
import { MemberGroupsComponent } from './member-profile/member-groups/member-groups.component';
import { MemberInfoComponent } from './member-profile/member-info/member-info.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MembersComponent } from './members.component';
import { MembersRoutingModule } from './members.routing';

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
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    CommonComponentsModule,
    NavigationsModule
  ],
  exports: [MemberFormComponent],
  providers: []
})
export class MembersModule {}
