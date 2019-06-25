import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
    children: [
      { path: '', component: ActivityListComponent },
      {
        path: 'new',
        component: ActivityNewComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {}
