import { PageNames } from '@enums';
import { Page } from '@models';
import { generatePageModel } from '@utils';

export const Pages: Page[] = [
  {
    bgData: {
      path: `/assets/bg/${PageNames.CONTACTS}.jpg`,
      positionY: 200
    },
    isHome: false,
    name: PageNames.CONTACTS
  },
  {
    bgData: {
      path: `/assets/bg/${PageNames.EXPERIENCE}.jpg`
    },
    isHome: false,
    name: PageNames.EXPERIENCE
  },
  {
    isHome: true,
    name: PageNames.HOME
  }
].map((page) => generatePageModel(page));
