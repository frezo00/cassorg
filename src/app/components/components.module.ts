import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [DashboardComponent, PageNotFoundComponent],
  imports: [CommonModule, AuthModule, SharedModule],
  exports: [AuthModule],
  providers: []
})
export class ComponentsModule {}
