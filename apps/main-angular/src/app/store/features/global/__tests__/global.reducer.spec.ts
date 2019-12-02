import { GlobalActions } from '../global.actions';
import { globalReducer } from '../global.reducer';
import { GlobalState } from '../global.state';

describe('global reducer', () => {
  let state: GlobalState;
  let result: GlobalState;

  describe('setIsMobile', () => {
    it('should set the value to false', () => {
      state = {
        isMobile: true
      };
      result = globalReducer(state, GlobalActions.setIsMobile({ isMobile: false }));

      expect(result.isMobile).toEqual(false);
    });

    it('should set the value to true', () => {
      state = {
        isMobile: false
      };
      result = globalReducer(state, GlobalActions.setIsMobile({ isMobile: true }));

      expect(result.isMobile).toEqual(true);
    });
  });
});
