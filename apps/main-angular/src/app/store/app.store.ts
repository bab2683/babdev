import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@env/environment';

import { GLOBAL_FEATURE, GlobalEffects, globalReducer, GlobalState } from './features';

export interface AppState {
  [GLOBAL_FEATURE]: GlobalState;
}

export const AppEffects: any[] = [GlobalEffects];

export const reducers: ActionReducerMap<AppState> = {
  [GLOBAL_FEATURE]: globalReducer
};

export const metaReducers: Array<MetaReducer<AppState>> = !environment.production ? [] : [];
