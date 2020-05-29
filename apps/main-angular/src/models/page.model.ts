import { BgModel } from '@babdev/layout';
import { DictionaryLoader } from '@babdev/translate';

export interface PageData {
  bg?: BgModel;
  dictionary: DictionaryLoader;
  name: string;
  titleKey: string;
}

export interface Page {
  data: PageData;
  moduleName: string;
  path: string;
}
