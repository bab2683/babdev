import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import * as utils from '@babdev/utils';

import { GlobalEffects } from '../global.effects';

describe('AppEffects', () => {
  // let actions$: Observable<any>;
  let effects: GlobalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalEffects /* provideMockActions(() => actions$) */]
    });

    effects = TestBed.get<GlobalEffects>(GlobalEffects);
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
});
