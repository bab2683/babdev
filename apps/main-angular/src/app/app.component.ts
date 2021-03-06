import { AnimationEvent } from '@angular/animations';
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

import {
  floatingHeaderAnimation,
  menuAnimation,
  routerAnimation
} from '@animations';
import { HeaderAnimationEnum, MenuAnimationEnum, PageNames } from '@enums';
import { PageData } from '@models';
import {
  AppState,
  getIsMobileState,
  getNavigationId,
  getRouteData,
  isHome
} from '@store';

@Component({
  animations: [floatingHeaderAnimation, menuAnimation, routerAnimation],
  selector: 'babdev-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar', { static: false }) public sidebar: SidebarComponent;

  public isMobile: boolean;
  public sidebarMode: SidebarMode;
  public showNav: boolean;
  public menuAnimation: MenuAnimationEnum = MenuAnimationEnum.Closed;

  public isMobile$: Observable<boolean>;
  public isHomePage$: Observable<boolean>;
  public headerAnimation$: Observable<HeaderAnimationEnum>;
  public pageData$: Observable<PageData>;
  public navigationId$: Observable<number>;

  public title = 'main-angular';

  constructor(
    public renderer: Renderer2,
    private translateService: TranslateService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document,
    private actions$: Actions
  ) {}

  public ngOnInit(): void {
    this.pageData$ = this.store.pipe(
      select(getRouteData),
      tap(
        ({ dictionary }) =>
          dictionary && this.translateService.loadDictionary(dictionary)
      )
    );

    this.isMobile$ = this.store.pipe(select(getIsMobileState)).pipe(take(1));

    this.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      this.sidebarMode = isMobile ? SidebarMode.OVER : SidebarMode.SIDE;
      this.renderer.addClass(
        this.document.body,
        isMobile ? DeviceClasses.mobile : DeviceClasses.desktop
      );
    });

    this.isHomePage$ = this.store.pipe(select(isHome));

    this.headerAnimation$ = combineLatest([
      this.isMobile$,
      this.isHomePage$
    ]).pipe(
      tap(([isMobile, isHomePage]) => (this.showNav = !isMobile || isHomePage)),
      map(([isMobile, isHomePage]) =>
        isMobile
          ? HeaderAnimationEnum.None
          : isHomePage
          ? HeaderAnimationEnum.Base
          : HeaderAnimationEnum.Translated
      )
    );

    this.navigationId$ = this.store.pipe(select(getNavigationId));

    // Close sidebar on router navigation
    this.actions$
      .pipe(
        ofType(routerRequestAction),
        tap(() => this.sidebar && this.sidebar.close())
      )
      .subscribe();
  }

  public prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['name']
    );
  }

  public changeMenuAnimationState({
    fromState,
    phaseName,
    toState
  }: AnimationEvent): void {
    if (toState !== null) {
      if (phaseName === 'start') {
        if (toState === PageNames.HOME) {
          this.menuAnimation = MenuAnimationEnum.Closed;
        } else if (fromState === PageNames.HOME) {
          this.menuAnimation = MenuAnimationEnum.Transit;
        }
      } else {
        if (toState !== PageNames.HOME) {
          this.menuAnimation = MenuAnimationEnum.Open;
        }
      }
    }
  }
}
