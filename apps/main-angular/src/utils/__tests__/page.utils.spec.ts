import { generatePageModel } from '../page.utils';

describe('Page utils', () => {
  describe('generatePageModel', () => {
    it('should match snapshot for homepage', () => {
      const result = generatePageModel({
        name: 'home',
        hasBg: false,
        isHome: true
      });

      expect(result).toMatchSnapshot();
    });

    it('should match snapshot for landing page', () => {
      const result = generatePageModel({
        name: 'experience',
        hasBg: true,
        isHome: false
      });

      expect(result).toMatchSnapshot();
    });
  });
});
