import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RequestModule } from '@babdev/request';
import { SidebarModule } from '@babdev/sidebar';
import { TranslateModule } from '@babdev/translate';

import { translateConfig } from '@constants';
import { environment } from '@env/environment';
import { AppEffects, metaReducers, reducers } from '@store';
import { AppComponent } from './app.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { routes } from './pages/app.routes';

@NgModule({
  declarations: [AppComponent, PageListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RequestModule,
    RouterModule.forRoot(routes),
    SidebarModule,
    TranslateModule.forRoot(translateConfig),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(AppEffects),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
