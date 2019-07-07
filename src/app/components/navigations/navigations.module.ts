import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonComponentsModule } from '../common/common-components.module';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

@NgModule({
  declarations: [TopNavigationComponent, SideNavigationComponent, BottomNavigationComponent],
  imports: [CommonModule, SharedModule, CommonComponentsModule],
  exports: [TopNavigationComponent, SideNavigationComponent, BottomNavigationComponent],
  providers: []
})
export class NavigationsModule {}
