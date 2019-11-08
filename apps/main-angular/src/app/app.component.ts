import { Component, ViewChild } from '@angular/core';
import { SidebarComponent, SidebarStatus } from '@babdev/sidebar';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;
  title = 'main-angular';

  // sidebarStatus(status: SidebarStatus) {
  //   console.log('sidebar status', status);
  // }

  // openSidebar(): void {
  //   this.sidebar.open();
  // }
}
