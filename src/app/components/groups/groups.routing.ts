import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckFormGuard } from '../../guards/check-form.guard';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupNewComponent } from './group-new/group-new.component';
import { GroupsComponent } from './groups.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      { path: '', component: GroupListComponent },
      {
        path: 'new',
        component: GroupNewComponent,
        canDeactivate: [CheckFormGuard]
      },
      {
        path: 'edit/:id',
        component: GroupEditComponent,
        canDeactivate: [CheckFormGuard]
      },
      { path: ':id', component: GroupDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
