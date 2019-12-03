import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GLOBAL_FEATURE, GlobalState } from './global.state';

export const getGlobalState = createFeatureSelector<GlobalState>(GLOBAL_FEATURE);

export const getIsMobileState = createSelector(
  getGlobalState,
  ({ isMobile }: GlobalState) => isMobile
);
