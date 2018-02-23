import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideTopHeaderComponent } from './side-menu/side-top-header/side-top-header.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

@NgModule({
  declarations: [SideMenuComponent, SideTopHeaderComponent, TopNavbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [SideMenuComponent, TopNavbarComponent],
  providers: []
})
export class NavigationModule {}
