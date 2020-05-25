import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerRequestAction } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import * as utils from '@babdev/utils';

import { GlobalActions } from '../global.actions';
import { GlobalEffects } from '../global.effects';

describe('AppEffects', () => {
  let actions$: Observable<Action>;
  let effects: GlobalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject<GlobalEffects>(GlobalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('on init', () => {
    it('should return false', () => {
      jest.spyOn(utils, 'isMobile').mockReturnValue(false);
      const result = effects.ngrxOnInitEffects();

      expect(result.isMobile).toEqual(false);
    });

    it('should return true', () => {
      jest.spyOn(utils, 'isMobile').mockReturnValue(true);
      const result = effects.ngrxOnInitEffects();

      expect(result.isMobile).toEqual(true);
    });
  });

  describe('onRouterRequest$', () => {
    it(
      'should change the homepage to true',
      marbles((m) => {
        const action = routerRequestAction({
          payload: { routerState: {} as any, event: { id: 1, url: '/' } }
        });
        const completion = GlobalActions.setIsHomePage({ isHomePage: true });

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', { b: completion });

        m.expect(effects.onRouterRequest$).toBeObservable(expected);
      })
    );

    it(
      'should change the homepage to true',
      marbles((m) => {
        const action = routerRequestAction({
          payload: {
            routerState: {} as any,
            event: { id: 1, url: '/contacts' }
          }
        });
        const completion = GlobalActions.setIsHomePage({ isHomePage: false });

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', { b: completion });

        m.expect(effects.onRouterRequest$).toBeObservable(expected);
      })
    );
  });
});
