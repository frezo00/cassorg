import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { StopPropagationDirective } from '../directives/stop-propagation.directive';

import { CreateProjectModalComponent } from './../components/project/create-project-modal/create-project-modal.component';

@NgModule({
  declarations: [StopPropagationDirective, CreateProjectModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    StopPropagationDirective,
    CreateProjectModalComponent
  ],
  providers: [],
  entryComponents: [CreateProjectModalComponent]
})
export class SharedModule {}
