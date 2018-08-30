import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { LoadingComponent } from './loading/loading.component';
import { SubheaderComponent } from './subheader/subheader.component';

@NgModule({
  declarations: [LoadingComponent, SubheaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoadingComponent, SubheaderComponent],
  providers: []
})
export class CommonComponentsModule {}
