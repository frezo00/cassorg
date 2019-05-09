import { Routes } from '@angular/router';

import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { EmailConfirmationComponent } from '../components/auth/email-confirmation/email-confirmation.component';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent }
];
