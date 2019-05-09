import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  MatMomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';

import { StopPropagationDirective } from '../directives/stop-propagation.directive';
import { CreateProjectModalComponent } from './../components/project/create-project-modal/create-project-modal.component';
import { FirstLetterPipe } from '../pipes/first-letter.pipe';
import { AgePipe } from '../pipes/age.pipe';
import { UserSizePipe } from '../pipes/user-size.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from '@angular/material';

@NgModule({
  declarations: [
    StopPropagationDirective,
    CreateProjectModalComponent,
    FirstLetterPipe,
    AgePipe,
    UserSizePipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule,
    MatMomentDateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule,
    MatMomentDateModule,
    StopPropagationDirective,
    CreateProjectModalComponent,
    FirstLetterPipe,
    AgePipe,
    UserSizePipe,
    SearchPipe
  ],
  providers: [
    /* {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }, */
    { provide: MAT_DATE_LOCALE, useValue: 'hr-HR' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  entryComponents: [CreateProjectModalComponent]
})
export class SharedModule {}
