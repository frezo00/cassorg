import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { LoadingComponent } from './loading/loading.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AlertBarComponent,
    EmptyStateComponent,
    PageNotFoundComponent,
    LoadingComponent,
    SubheaderComponent,
    ModalComponent,
    PaginationComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    AlertBarComponent,
    EmptyStateComponent,
    PageNotFoundComponent,
    LoadingComponent,
    SubheaderComponent,
    ModalComponent,
    PaginationComponent
  ],
  providers: [],
  entryComponents: [ModalComponent]
})
export class CommonComponentsModule {}
