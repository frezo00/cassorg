import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckFormGuard } from '../../guards/check-form.guard';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberNewComponent } from './member-new/member-new.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MembersComponent } from './members.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      { path: '', component: MemberListComponent },
      {
        path: 'new',
        component: MemberNewComponent,
        canDeactivate: [CheckFormGuard]
      },
      {
        path: 'edit/:id',
        component: MemberEditComponent,
        canDeactivate: [CheckFormGuard]
      },
      { path: ':id', component: MemberProfileComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}
