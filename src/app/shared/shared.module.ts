import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { StopPropagationDirective } from '../directives/stop-propagation.directive';
import { PipesModule } from '../pipes/pipes.module';
import { CreateProjectModalComponent } from './../components/project/create-project-modal/create-project-modal.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { HeaderBasicComponent } from './components/headers/header-basic/header-basic.component';
import { HeaderExpandedComponent } from './components/headers/header-expanded/header-expanded.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    StopPropagationDirective,
    CreateProjectModalComponent,
    AvatarComponent,
    HeaderBasicComponent,
    HeaderExpandedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule,
    MatMomentDateModule,
    PipesModule
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
    AvatarComponent,
    HeaderBasicComponent,
    HeaderExpandedComponent,
    PipesModule
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
