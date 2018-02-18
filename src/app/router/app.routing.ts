import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../components/auth/auth.guard';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthComponent } from '../components/auth/auth.component';
import { ActivitiesComponent } from '../components/activities/activities.component';
import { GroupsComponent } from '../components/groups/groups.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

import { authRoutes } from '../components/auth/auth.routing';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ActivitiesComponent },
      { path: 'groups', component: GroupsComponent }
    ]
  },
  { path: 'auth', component: AuthComponent, children: authRoutes },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
