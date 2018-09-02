import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { LoadingComponent } from './loading/loading.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [LoadingComponent, SubheaderComponent, ModalComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoadingComponent, SubheaderComponent, ModalComponent],
  providers: []
})
export class CommonComponentsModule {}
