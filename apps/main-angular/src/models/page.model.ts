import { DictionaryLoader } from '@babdev/translate';

export interface Page {
  data: {
    bgPath?: string;
    dictionary: DictionaryLoader;
    name: string;
    titleKey: string;
  };
  moduleName: string;
  path: string;
}
