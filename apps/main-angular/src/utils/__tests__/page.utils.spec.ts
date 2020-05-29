import { generatePageModel } from '../page.utils';

describe('Page utils', () => {
  describe('generatePageModel', () => {
    it('should match snapshot for homepage', () => {
      const result = generatePageModel({
        name: 'home',
        isHome: true
      });

      expect(result).toMatchSnapshot();
    });

    it('should match snapshot for landing page', () => {
      const result = generatePageModel({
        name: 'experience',
        bgData: {
          path: '/assets/bg/experience.jpg',
          positionY: 200
        },
        isHome: false
      });

      expect(result).toMatchSnapshot();
    });
  });
});
