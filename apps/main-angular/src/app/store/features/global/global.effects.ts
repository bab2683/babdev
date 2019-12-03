import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OnInitEffects } from '@ngrx/effects';

import { isMobile } from '@babdev/utils';

import { GlobalActions, GlobalActionTypes } from './global.actions';

@Injectable()
export class GlobalEffects implements OnInitEffects {
  public ngrxOnInitEffects(): { type: GlobalActionTypes; isMobile: boolean } {
    return GlobalActions.setIsMobile({ isMobile: isMobile(isPlatformBrowser(this.platformId)) });
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}
}
