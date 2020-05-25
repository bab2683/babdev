import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@env/environment';
import {
  GlobalEffects,
  globalReducer,
  GlobalState,
  GLOBAL_FEATURE,
  ROUTER_FEATURE
} from './features';

export interface AppState {
  [GLOBAL_FEATURE]: GlobalState;
  [ROUTER_FEATURE]: RouterReducerState;
}

export const AppEffects: any[] = [GlobalEffects];

export const reducers: ActionReducerMap<AppState> = {
  [GLOBAL_FEATURE]: globalReducer,
  [ROUTER_FEATURE]: routerReducer
};

export const metaReducers: Array<MetaReducer<
  AppState
>> = !environment.production ? [] : [];
