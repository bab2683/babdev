import { Component, ViewChild } from '@angular/core';
import { SidebarComponent, SidebarStatus } from '@babdev/sidebar';
import { TranslateService } from '@babdev/translate';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;
  title = 'main-angular';

  constructor(public translateService: TranslateService) {
    console.log(this.translateService);
  }

  // sidebarStatus(status: SidebarStatus) {
  //   console.log('sidebar status', status);
  // }
}
