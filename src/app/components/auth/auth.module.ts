import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailConfirmationComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [LoginComponent, RegisterComponent, EmailConfirmationComponent],
  providers: []
})
export class AuthModule {}
