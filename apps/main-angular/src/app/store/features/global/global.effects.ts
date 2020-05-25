import { isPlatformBrowser, Location } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { RouterRequestAction, ROUTER_REQUEST } from '@ngrx/router-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isMobile } from '@babdev/utils';

import { GlobalActions, GlobalActionTypes } from './global.actions';

@Injectable()
export class GlobalEffects implements OnInitEffects {
  public onRouterRequest$: Observable<
    ReturnType<typeof GlobalActions.setIsHomePage>
  > = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterRequestAction>(ROUTER_REQUEST),
      map(({ payload }) =>
        GlobalActions.setIsHomePage({ isHomePage: payload.event.url === '/' })
      )
    )
  );

  public ngrxOnInitEffects(): { type: GlobalActionTypes; isMobile: boolean } {
    return GlobalActions.setInitialState({
      isHomePage: this.location.path().length === 0,
      isMobile: isMobile(isPlatformBrowser(this.platformId))
    });
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private location: Location,
    private actions$: Actions
  ) {}
}
