import { createAction, props } from '@ngrx/store';

export enum GlobalActionTypes {
  INIT = '[Global] init',
  SET_IS_MOBILE = '[Global] set is mobile'
}

const init = createAction(GlobalActionTypes.INIT);

const setIsMobile = createAction(GlobalActionTypes.SET_IS_MOBILE, props<{ isMobile: boolean }>());

export const GlobalActions = {
  init,
  setIsMobile
};
