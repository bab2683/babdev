import { GlobalActions } from '../global.actions';
import { globalReducer } from '../global.reducer';
import { GlobalState } from '../global.state';

describe('global reducer', () => {
  let state: GlobalState;
  let result: GlobalState;

  describe('[Global] set initial state', () => {
    it('should set the initial values', () => {
      state = {
        isHomePage: null,
        isMobile: true
      };
      result = globalReducer(
        state,
        GlobalActions.setInitialState({ isHomePage: true, isMobile: false })
      );

      expect(result.isHomePage).toEqual(true);
      expect(result.isMobile).toEqual(false);
    });

    it('should set the initial values', () => {
      state = {
        isHomePage: null,
        isMobile: false
      };
      result = globalReducer(
        state,
        GlobalActions.setInitialState({ isHomePage: false, isMobile: true })
      );

      expect(result.isHomePage).toEqual(false);
      expect(result.isMobile).toEqual(true);
    });
  });

  describe('[Global] set is homepage', () => {
    it('should set the value to false', () => {
      state = {
        isHomePage: true,
        isMobile: false
      };
      result = globalReducer(
        state,
        GlobalActions.setIsHomePage({ isHomePage: false })
      );

      expect(result.isHomePage).toEqual(false);
    });

    it('should set the value to true', () => {
      state = {
        isHomePage: false,
        isMobile: false
      };
      result = globalReducer(
        state,
        GlobalActions.setIsHomePage({ isHomePage: true })
      );

      expect(result.isHomePage).toEqual(true);
    });
  });
});
