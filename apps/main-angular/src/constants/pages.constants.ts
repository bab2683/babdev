import { PageNames } from '@enums';
import { Page } from '@models';
import { generatePageModel } from '@utils';

export const Pages: Page[] = [
  {
    name: PageNames.CONTACTS,
    hasBg: true,
    isHome: false
  },
  {
    name: PageNames.EXPERIENCE,
    hasBg: true,
    isHome: false
  },
  {
    name: PageNames.HOME,
    hasBg: false,
    isHome: true
  }
].map((page) => generatePageModel(page));
