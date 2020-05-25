import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { RequestService } from '@babdev/request';
import { RequestServiceMock } from '@babdev/request-testing';
import { TranslateService } from '@babdev/translate';
import {
  TranslatePipeMock,
  TranslateServiceMock
} from '@babdev/translate-testing';

import { AppState, GLOBAL_FEATURE } from '@store';
import { ExperiencePageComponent } from '../experience-page.component';

describe('ExperiencePageComponent', () => {
  let component: ExperiencePageComponent;
  let fixture: ComponentFixture<ExperiencePageComponent>;
  let reqService: any;
  let store: MockStore<AppState>;

  beforeEach(() => {
    reqService = new RequestServiceMock();

    TestBed.configureTestingModule({
      declarations: [ExperiencePageComponent, TranslatePipeMock],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock
        },
        {
          provide: RequestService,
          useValue: reqService
        },
        provideMockStore({
          initialState: { [GLOBAL_FEATURE]: { isMobile: false } }
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencePageComponent);
    component = fixture.componentInstance;
    reqService = TestBed.inject(RequestService);
    store = TestBed.inject<Store<AppState>>(Store) as any;
    store.overrideSelector('getIsMobileState', true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should request technologies file', () => {
    reqService.get.mockReturnValueOnce(of({ data: [] })).mockReturnValueOnce(
      of({
        data: {
          sections: {
            experiences: {
              items: [
                {
                  dates: {
                    start: '2019/08/06',
                    end: null
                  }
                },
                {
                  dates: {
                    start: '2017/08/06',
                    end: null
                  }
                },
                {
                  dates: {
                    start: '2017/08/06',
                    end: '2018/10/02'
                  }
                }
              ]
            }
          }
        }
      })
    );

    component.ngOnInit();
    expect(reqService.get).toHaveBeenCalledTimes(2);

    component.CV$.subscribe((result) => {
      expect(result.sections.experiences.items[0]).toHaveProperty('duration');
    });
  });
});
