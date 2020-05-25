import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { RequestService } from '@babdev/request';
import { pathOr } from '@babdev/utils';

import { TranslateConfig } from './translate.config';
import { TranslateInjector } from './translate.injector';
import {
  ActiveDictionary,
  Dictionaries,
  Dictionary,
  DictionaryLoader
} from './translate.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private dictionaries: Dictionaries = {};
  private dictionariesObservable: Observable<{
    [name: string]: ActiveDictionary;
  }>;
  private dictionariesSubject: BehaviorSubject<{
    [name: string]: ActiveDictionary;
  }> = new BehaviorSubject({});
  private activeDictionaries: { [name: string]: ActiveDictionary } = {};
  private activeLanguage: string;
  private availableLanguages: string[];

  constructor(
    @Inject(TranslateInjector) private config: TranslateConfig,
    private req: RequestService
  ) {
    this.availableLanguages = this.config.languages;
    this.dictionariesObservable = this.dictionariesSubject.asObservable();
    this.activeLanguage = this.config.defaultLanguage;

    if (this.config.initialDictionaries) {
      if (this.config.initialDictionaries.length > 1) {
        this.checkDictionaries(
          this.activeLanguage,
          true,
          this.config.initialDictionaries
        );
      } else {
        this.loadDictionary(this.config.initialDictionaries[0]);
      }
    }
  }

  public getKey(explodedPath: string[]): Observable<string | null> {
    const dictionary: string = explodedPath[0];
    const path: string[] = [...explodedPath];
    path.shift();

    return this.dictionariesObservable.pipe(
      map((data) => pathOr(null, [dictionary, ...path], data))
    );
  }

  public changeActiveLanguage(language: string) {
    this.activeLanguage = language;
    this.checkDictionaries(language);
  }

  public loadDictionary({ location, name }: DictionaryLoader) {
    if (!this.dictionaries[name]) {
      this.dictionaries[name] = this.updateDictionaries();
    }
    if (!this.isDictionaryLoaded(name, this.activeLanguage)) {
      this.addDictionary({ location, name }, this.activeLanguage).subscribe(
        () => {
          this.updateValues();
        }
      );
    }
  }

  private checkDictionaries(
    language: string,
    firstLoad: boolean = false,
    dictionaries: DictionaryLoader[] = []
  ): void {
    let dictionariesToLoad: DictionaryLoader[] = [];

    if (firstLoad) {
      dictionariesToLoad = dictionaries.map((dictionary) => {
        this.dictionaries[dictionary.name] = this.updateDictionaries();
        return dictionary;
      });
    } else {
      Object.keys(this.dictionaries).forEach((name) => {
        if (!this.isDictionaryLoaded(name, language)) {
          dictionariesToLoad.push({
            location: this.dictionaries[name].location,
            name
          });
        }
      });
    }

    if (dictionariesToLoad.length) {
      forkJoin(
        dictionariesToLoad.map((dictionary) => {
          return this.addDictionary(dictionary, language);
        })
      ).subscribe(() => {
        this.updateValues();
      });
    } else {
      this.updateValues();
    }
  }

  private addDictionary(
    { location, name }: DictionaryLoader,
    language: string
  ): Observable<any> {
    this.dictionaries[name].location = location;
    return this.req
      .get<any>({ url: this.generateUrl(location, name, language) })
      .pipe(
        take(1),
        tap(({ data }) => {
          this.dictionaries[name][language].loaded = true;
          this.dictionaries[name][language].values = data;
        })
      );
  }

  private isDictionaryLoaded(name: string, language: string): boolean {
    return this.dictionaries[name][language].loaded;
  }

  private updateDictionaries(): Dictionary {
    return this.availableLanguages.reduce((dictionaries, current) => {
      dictionaries[current] = {
        loaded: false,
        values: {}
      };
      return dictionaries;
    }, {});
  }

  private updateValues(): void {
    this.activeDictionaries = Object.keys(this.dictionaries).reduce(
      (active, current) => {
        active[current] = {
          ...this.dictionaries[current][this.activeLanguage].values
        };

        return active;
      },
      {}
    );

    this.dictionariesSubject.next(this.activeDictionaries);
  }

  private generateUrl(
    directory: string,
    name: string,
    language: string
  ): string {
    // tslint:disable-next-line
    return `${this.config.translationDirectoryRoot}${directory}${name}_${language}.${this.config.filesExtension}`;
  }
}
