import { Duration } from '@models';

import { calculateDuration } from '../date.utils';

describe('date utils', () => {
  describe('calculateDuration', () => {
    it('should return 2 months', () => {
      const result: Duration = calculateDuration(new Date(2020, 6, 6), new Date(2020, 8, 4));

      expect(result.months).toBe(2);
    });

    it('should return 1 year 1 month', () => {
      const result: Duration = calculateDuration(new Date(2019, 5, 1), new Date(2020, 6, 4));

      expect(result.months).toBe(1);
      expect(result.years).toBe(1);
    });
  });
});
