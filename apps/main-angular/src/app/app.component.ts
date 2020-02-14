import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarMode, SidebarStatus } from '@babdev/sidebar';
import { TranslateService } from '@babdev/translate';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState, getIsMobileState } from '@store';

import { fade } from './pages/route.animations';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;

  public isMobile$: Observable<boolean>;
  public isMobile: boolean;
  public sidebarMode: SidebarMode;

  title = 'main-angular';

  constructor(
    public translateService: TranslateService,
    public renderer: Renderer2,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.isMobile$ = this.store.pipe(select(getIsMobileState));

    this.isMobile$.pipe(take(1)).subscribe(isMobile => {
      this.isMobile = isMobile;
      this.sidebarMode = isMobile ? SidebarMode.OVER : SidebarMode.SIDE;
      if (!isMobile) {
        this.renderer.addClass(document.body, 'isDesktop');
      }
    });
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['name'];
  }

  // sidebarStatus(status: SidebarStatus) {
  //   console.log('sidebar status', status);
  // }
}
