import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { routerRequestAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { SidebarComponent, SidebarMode } from '@babdev/sidebar';
import { DeviceClasses } from '@babdev/styleguide';
import { TranslateService } from '@babdev/translate';

import { menuAnimation, routerAnimation } from '@animations';
import { MenuAnimationEnum } from '@enums';
import { AppState, getIsMobileState, isHome } from '@store';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [menuAnimation, routerAnimation]
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar', { static: false }) sidebar: SidebarComponent;

  public isMobile: boolean;
  public sidebarMode: SidebarMode;
  public showNav: boolean;

  public isMobile$: Observable<boolean>;
  public menuAnimation$: Observable<MenuAnimationEnum>;

  title = 'main-angular';

  constructor(
    public translateService: TranslateService,
    public renderer: Renderer2,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document,
    private actions$: Actions
  ) {}

  public ngOnInit(): void {
    this.isMobile$ = this.store.pipe(select(getIsMobileState)).pipe(take(1));

    this.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      this.sidebarMode = isMobile ? SidebarMode.OVER : SidebarMode.SIDE;
      this.renderer.addClass(
        this.document.body,
        isMobile ? DeviceClasses.mobile : DeviceClasses.desktop
      );
    });

    this.menuAnimation$ = combineLatest([
      this.isMobile$,
      this.store.pipe(select(isHome))
    ]).pipe(
      tap(([isMobile, isHomePage]) => (this.showNav = !isMobile || isHomePage)),
      map(([isMobile, isHomePage]) =>
        isMobile
          ? MenuAnimationEnum.None
          : isHomePage
          ? MenuAnimationEnum.Base
          : MenuAnimationEnum.Translated
      )
    );

    // Close sidebar on router navigation
    this.actions$
      .pipe(
        ofType(routerRequestAction),
        tap(() => this.sidebar && this.sidebar.close())
      )
      .subscribe();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['name']
    );
  }
}
