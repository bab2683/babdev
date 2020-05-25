import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { GlobalActions } from './global.actions';
import { GlobalState } from './global.state';

const initialState: GlobalState = {
  isHomePage: null,
  isMobile: false
};

const reducer: ActionReducer<GlobalState> = createReducer(
  initialState,
  on(GlobalActions.setInitialState, (state, { isHomePage, isMobile }) => ({
    ...state,
    isHomePage,
    isMobile
  })),
  on(GlobalActions.setIsHomePage, (state, { isHomePage }) => ({
    ...state,
    isHomePage
  }))
);

export function globalReducer(
  state: GlobalState | undefined,
  action: Action
): GlobalState {
  return reducer(state, action);
}
