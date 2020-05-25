import { createAction, props } from '@ngrx/store';

export enum GlobalActionTypes {
  INIT = '[Global] set initial state',
  SET_IS_HOMEPAGE = '[Global] set is homepage'
}

const init = createAction(GlobalActionTypes.INIT);

const setIsHomePage = createAction(
  GlobalActionTypes.SET_IS_HOMEPAGE,
  props<{ isHomePage: boolean }>()
);

const setInitialState = createAction(
  GlobalActionTypes.INIT,
  props<{ isMobile: boolean; isHomePage: boolean }>()
);

export const GlobalActions = {
  init,
  setInitialState,
  setIsHomePage
};
