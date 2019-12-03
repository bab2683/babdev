import { ActionReducer, createReducer, on } from '@ngrx/store';

import { GlobalActions } from './global.actions';
import { GlobalState } from './global.state';

const initialState: GlobalState = {
  isMobile: false
};

export const globalReducer: ActionReducer<GlobalState> = createReducer(
  initialState,
  on(GlobalActions.setIsMobile, (state, { isMobile }) => ({ ...state, isMobile }))
);
