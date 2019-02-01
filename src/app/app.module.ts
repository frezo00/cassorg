import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './components/auth/store';
import { RouterEffects } from './router/store';
import { UsersEffects } from './store';
import { ProjectEffects } from './components/project/store';
import { MembersEffects } from './components/members/store';
import { GroupsEffects } from './components/groups/store';
import { ApplicantsEffects } from './components/applicants/store';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './router/app.routing';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { reducers } from './store/app.reducers';
import { AuthService } from './components/auth/auth.service';
import { ProjectService } from './components/project/project.service';
import { UsersService } from './components/users/user.service';
import { CommonService } from './components/common/common.service';
import { ModalService } from './components/common/modal/modal.service';
import { GroupsService } from './components/groups/groups.service';
import { ApplicantsService } from './components/applicants/applicants.service';
import { MembersService } from './components/members/members.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      RouterEffects,
      UsersEffects,
      ProjectEffects,
      MembersEffects,
      GroupsEffects,
      ApplicantsEffects
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ComponentsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    AuthService,
    ProjectService,
    UsersService,
    ApplicantsService,
    MembersService,
    GroupsService,
    CommonService,
    ModalService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.registerFontClassAlias('fa');
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
