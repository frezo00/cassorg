import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../components/auth/auth.guard';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthComponent } from '../components/auth/auth.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { EmailConfirmationComponent } from '../components/auth/email-confirmation/email-confirmation.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

import { authRoutes } from '../components/auth/auth.routing';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent, children: authRoutes },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
