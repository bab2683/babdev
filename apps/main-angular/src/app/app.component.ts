import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarStatus } from '@babdev/sidebar';
import { TranslateService } from '@babdev/translate';

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

  constructor(public translateService: TranslateService) {}

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['name'];
  }

  // sidebarStatus(status: SidebarStatus) {
  //   console.log('sidebar status', status);
  // }
}
