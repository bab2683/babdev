import { TranslateConfig } from '@babdev/translate';

import { AvailableLanguages } from '@enums';

export const translateConfig: TranslateConfig = {
  defaultLanguage: AvailableLanguages.EN,
  filesExtension: 'json',
  initialDictionaries: [
    { location: '', name: 'common' },
    { location: '/pages/home/', name: 'home' }
  ],
  languages: Object.values(AvailableLanguages),
  translationDirectoryRoot: 'assets/translate/'
};
