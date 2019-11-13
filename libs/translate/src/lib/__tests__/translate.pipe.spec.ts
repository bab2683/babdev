import { Observable, of } from 'rxjs';

import { TranslatePipe } from '../translate.pipe';

const translateServiceMock = {
  getKey: jest.fn().mockReturnValue(of(null))
};

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    pipe = new TranslatePipe(translateServiceMock as any);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return null when dictionary not present', () => {
      const result: Observable<any> = pipe.transform('TEST.FIRST');

      result.subscribe(data => {
        expect(data).toBe(null);
      });
    });
  });
});
