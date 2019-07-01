import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

@NgModule({
  declarations: [SideMenuComponent, TopNavbarComponent],
  imports: [CommonModule, SharedModule, CommonComponentsModule],
  exports: [SideMenuComponent, TopNavbarComponent],
  providers: []
})
export class NavigationModule {}
