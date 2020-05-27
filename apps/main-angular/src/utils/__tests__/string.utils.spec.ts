import { capitalize } from '../string.utils';

describe('String utils', () => {
  describe('capitalize', () => {
    it('should return a capitalized string', () => {
      const result: string = capitalize('braulio');

      expect(result).toEqual('Braulio');
    });
  });
});
