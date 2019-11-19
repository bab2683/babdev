import { DictionaryLoader } from './translate.model';

export interface TranslateConfig {
  defaultLanguage: string;
  filesExtension: string;
  initialDictionaries?: DictionaryLoader[];
  languages: string[];
  translationDirectoryRoot: string;
}
