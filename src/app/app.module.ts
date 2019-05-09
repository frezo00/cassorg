import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  NavigationActionTiming
} from '@ngrx/router-store';
import { reducers, effects, CustomSerializer } from './store';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './routes/app.routing';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

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
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
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
