import { PageNames } from '@enums';
import { Page } from '@models';

export const Pages: { [key in PageNames]: Page } = {
  [PageNames.CONTACTS]: {
    bgPath: 'bg/contacts',
    moduleName: 'ContactsModule',
    name: PageNames.CONTACTS,
    path: 'contacts',
    titleKey: 'common.PAGES.CONTACTS',
    translationLocation: '/pages/contacts/'
  },
  [PageNames.EXPERIENCE]: {
    bgPath: 'bg/experience',
    moduleName: 'ExperienceModule',
    name: PageNames.EXPERIENCE,
    path: 'experience',
    titleKey: 'common.PAGES.EXPERIENCE',
    translationLocation: '/pages/experience/'
  },
  [PageNames.HOME]: {
    moduleName: 'HomeModule',
    name: PageNames.HOME,
    path: '',
    titleKey: 'common.PAGES.HOME',
    translationLocation: '/pages/home/'
  }
};
