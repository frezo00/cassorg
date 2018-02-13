import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { MaterialModule } from '../../shared/material.module';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailConfirmationComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  exports: [],
  providers: []
})
export class AuthModule {}
