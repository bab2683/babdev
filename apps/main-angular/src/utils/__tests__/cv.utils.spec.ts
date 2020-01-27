import { CV } from '@models';

import { parseCVDates } from '../cv.utils';

describe('cv utils', () => {
  describe('parseCVDates', () => {
    it('should calculate the duration', () => {
      const result: CV = parseCVDates({
        sections: {
          experiences: {
            items: [
              {
                dates: {
                  start: '2018/07/16',
                  end: '2019/04/12'
                }
              }
            ]
          }
        }
      } as CV);

      expect(result.sections.experiences.items[0].duration).toEqual({ months: 9, years: null });
    });
  });
});
