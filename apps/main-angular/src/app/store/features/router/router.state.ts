import { RouterReducerState } from '@ngrx/router-store';

export interface RouterState {
  router: RouterReducerState;
}

export const ROUTER_FEATURE = 'router';
