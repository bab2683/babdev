import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarStatus } from '@babdev/sidebar';
import { TranslateService } from '@babdev/translate';
import { isMobile } from '@babdev/utils';

import { fade } from './pages/route.animations';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})
export class AppComponent {
  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;

  title = 'main-angular';
  public isBrowser: boolean;
  public isMobile: boolean;

  constructor(
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMobile = isMobile(this.isBrowser);

    if (this.isBrowser && !this.isMobile) {
      document.body.classList.add('isDesktop');
    }
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['name'];
  }

  // sidebarStatus(status: SidebarStatus) {
  //   console.log('sidebar status', status);
  // }
}
