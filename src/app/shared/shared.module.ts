import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';

import { StopPropagationDirective } from '../directives/stop-propagation.directive';
import { CreateProjectModalComponent } from './../components/project/create-project-modal/create-project-modal.component';
import { FirstLetterPipe } from '../pipes/first-letter.pipe';
import { AgePipe } from '../pipes/age.pipe';
import { UserSizePipe } from '../pipes/user-size.pipe';

@NgModule({
  declarations: [
    StopPropagationDirective,
    CreateProjectModalComponent,
    FirstLetterPipe,
    AgePipe,
    UserSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule,
    StopPropagationDirective,
    CreateProjectModalComponent,
    FirstLetterPipe,
    AgePipe,
    UserSizePipe
  ],
  providers: [],
  entryComponents: [CreateProjectModalComponent]
})
export class SharedModule {}
