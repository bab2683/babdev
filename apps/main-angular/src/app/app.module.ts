import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '@babdev/sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
