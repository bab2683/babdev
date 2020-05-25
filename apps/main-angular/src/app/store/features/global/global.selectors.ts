import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GlobalState, GLOBAL_FEATURE } from './global.state';

export const getGlobalState = createFeatureSelector<GlobalState>(
  GLOBAL_FEATURE
);

export const getIsMobileState = createSelector(
  getGlobalState,
  ({ isMobile }: GlobalState) => isMobile
);

export const isHome = createSelector(
  getGlobalState,
  ({ isHomePage }: GlobalState) => isHomePage
);
