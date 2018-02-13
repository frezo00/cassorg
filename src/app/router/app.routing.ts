import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../components/auth/auth.guard';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
// import { PageNotFoundComponent } from './';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] }
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
