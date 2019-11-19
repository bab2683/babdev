export interface Dictionaries {
  [dictionary: string]: Dictionary;
}

export interface Dictionary {
  [language: string]: {
    loaded: boolean;
    values: {
      [value: string]: any;
    };
  };
  location?: any;
}

export interface DictionaryLoader {
  location: string;
  name: string;
}

export interface ActiveDictionary {
  name: string;
  values: { [name: string]: any };
}
