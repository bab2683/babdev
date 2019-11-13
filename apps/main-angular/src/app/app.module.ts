import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RequestModule } from '@babdev/request';
import { SidebarModule } from '@babdev/sidebar';
import { TranslateModule } from '@babdev/translate';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { translateConfig } from '@constants';

import { AppComponent } from './app.component';
import { PageListComponent } from './components/page-list/page-list.component';

@NgModule({
  declarations: [AppComponent, PageListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RequestModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    SidebarModule,
    TranslateModule.forRoot(translateConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
