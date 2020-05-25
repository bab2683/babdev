import { of } from 'rxjs';

import { DictionaryLoader } from '../translate.model';
import { TranslateService } from '../translate.service';

class MockRequestService {
  public get: any = jest.fn().mockReturnValue(of({ TEST: 'test' }));
}

const initialDictionary: DictionaryLoader = { location: '', name: 'test' };
const defaultLanguage: string = 'en';
const filesExtension: string = 'json';

describe('TranslateService', () => {
  let service: TranslateService;
  let mockService: MockRequestService;

  describe('initialized with no dictionaries', () => {
    it('should request any file', () => {
      mockService = new MockRequestService();
      service = new TranslateService(
        {
          defaultLanguage,
          filesExtension,
          languages: ['en', 'it'],
          translationDirectoryRoot: ''
        },
        mockService as any
      );

      expect(mockService.get).not.toHaveBeenCalled();
    });
  });

  describe('check with one initial dictionary', () => {
    beforeEach(() => {
      mockService = new MockRequestService();
      service = new TranslateService(
        {
          defaultLanguage,
          filesExtension,
          initialDictionaries: [initialDictionary],
          languages: ['en', 'it'],
          translationDirectoryRoot: ''
        },
        mockService as any
      );
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
      expect(mockService.get).toHaveBeenCalled();
      expect(mockService.get).toHaveBeenCalledWith({
        url: `${initialDictionary.name}_${defaultLanguage}.${filesExtension}`
      });
    });

    describe('getKey', () => {
      it('should return the key', () => {
        const result = service.getKey(['test', 'TEST']);

        result.subscribe((key) => {
          expect(key).toBe('test');
        });
      });

      it('should return null', () => {
        const result = service.getKey(['test', 'TEST2']);

        result.subscribe((key) => {
          expect(key).toBe(null);
        });
      });
    });

    describe('changeActiveLanguage', () => {
      it('should load other languages files', () => {
        const newLanguage: string = 'it';
        const expectedTranslationKey: string = 'test in italiano';
        mockService.get.mockReturnValueOnce(
          of({ TEST: expectedTranslationKey })
        );

        service.changeActiveLanguage(newLanguage);

        expect(mockService.get).toHaveBeenCalledWith({
          url: `${initialDictionary.name}_${newLanguage}.${filesExtension}`
        });

        service.changeActiveLanguage('en');
        /*
        2 because the first on init, and the second when
        we changed the language the first time
        */
        expect(mockService.get).toHaveBeenCalledTimes(2);
      });
    });

    describe('loadDictionary', () => {
      it('should not load loaded dictionary', () => {
        service.loadDictionary(initialDictionary);

        expect(mockService.get).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('check with multiple initial dictionaries', () => {
    const secondDictionary: DictionaryLoader = {
      location: '/main/',
      name: 'main'
    };

    beforeEach(() => {
      mockService = new MockRequestService();
      service = new TranslateService(
        {
          defaultLanguage,
          filesExtension,
          initialDictionaries: [initialDictionary, secondDictionary],
          languages: ['en', 'it'],
          translationDirectoryRoot: ''
        },
        mockService as any
      );
    });

    it('should load 2 dictionaries at the start', () => {
      const expctedCalls = [
        [
          {
            url: `${initialDictionary.name}_${defaultLanguage}.${filesExtension}`
          }
        ],
        [
          {
            url: `/main/${secondDictionary.name}_${defaultLanguage}.${filesExtension}`
          }
        ]
      ];

      expect(service).toBeTruthy();
      expect(mockService.get).toHaveBeenCalled();
      expect(mockService.get).toHaveBeenCalledTimes(2);
      expect(mockService.get.mock.calls).toEqual(expctedCalls);
    });
  });
});
