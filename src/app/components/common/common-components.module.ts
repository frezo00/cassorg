import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SubheaderComponent } from './subheader/subheader.component';

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
