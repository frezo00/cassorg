import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
import { reducers, effects } from './store';
import { AuthService } from './components/auth/auth.service';
import { ProjectService } from './components/project/project.service';
import { UsersService } from './components/users/user.service';
import { CommonService } from './components/common/common.service';
import { GroupsService } from './components/groups/groups.service';
import { ApplicantsService } from './components/applicants/applicants.service';
import { MembersService } from './components/members/members.service';
import {
  StoreRouterConnectingModule,
  NavigationActionTiming
} from '@ngrx/router-store';
import { CustomSerializer } from './router/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ComponentsModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),
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
