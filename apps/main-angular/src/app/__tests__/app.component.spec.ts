import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { Renderer2, Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerRequestAction } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';

import { SidebarComponent } from '@babdev/sidebar';
import { DeviceClasses } from '@babdev/styleguide';
import { TranslateService } from '@babdev/translate';
import { TranslateServiceMock } from '@babdev/translate-testing';

import { HeaderAnimationEnum, MenuAnimationEnum, PageNames } from '@enums';
import {
  AppState,
  getIsMobileState,
  getRouteData,
  isHome,
  MockedAppStore
} from '@store';
import { AppComponent } from '../app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  let renderer: Renderer2;
  let translationService: TranslateService;
  const actions$: BehaviorSubject<Action> = new BehaviorSubject({ type: '' });
  const initialState: AppState = MockedAppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [AppComponent, SidebarComponent],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock
        },
        provideMockStore({ initialState }),
        Renderer2,
        provideMockActions(() => actions$)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.inject<Store<AppState>>(Store) as any;
    renderer = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>
    );
    translationService = TestBed.inject(TranslateService);

    jest.spyOn(renderer, 'addClass');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it(`should have as title 'main-angular'`, () => {
    expect(component.title).toEqual('main-angular');
  });

  it('should assign the global class', () => {
    store.setState({
      global: { isHomePage: true, isMobile: false },
      router: {} as any
    });
    component.ngOnInit();

    expect(component.isMobile).toEqual(false);
    expect(renderer.addClass).toHaveBeenCalledWith(
      expect.any(HTMLBodyElement),
      DeviceClasses.desktop
    );
  });

  it('should not assign the global class', () => {
    store.setState({
      global: { isHomePage: true, isMobile: true },
      router: {} as any
    });
    component.ngOnInit();

    expect(component.isMobile).toEqual(true);
    expect(renderer.addClass).toHaveBeenCalledWith(
      expect.any(HTMLBodyElement),
      DeviceClasses.mobile
    );
  });

  describe('onInit', () => {
    it('should listen for router request and close sidebar', fakeAsync(() => {
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.sidebar).toBeDefined();
      jest.spyOn(component.sidebar, 'close');

      actions$.next(routerRequestAction({ payload: {} as any }));

      tick(1);

      expect(component.sidebar.close).toHaveBeenCalled();
    }));

    it('should not call the translation service if not necessary', () => {
      fixture.detectChanges();
      component.ngOnInit();
      store.overrideSelector(
        getRouteData as any,
        {
          name: ''
        } as any
      );
      store.refreshState();
      fixture.detectChanges();
      expect(translationService.loadDictionary).not.toHaveBeenCalled();
    });

    it('should automatically add the dictionary for the page', () => {
      fixture.detectChanges();
      component.ngOnInit();
      const dictionary = { location: '/pages/contacts/', name: 'contacts' };
      store.overrideSelector(
        getRouteData as any,
        {
          dictionary
        } as any
      );
      store.refreshState();
      fixture.detectChanges();
      expect(translationService.loadDictionary).toHaveBeenCalledWith(
        dictionary
      );
    });

    describe('menu animations', () => {
      let isMobileSelector: any;
      let isHomeSelector: any;

      beforeEach(() => {
        component.ngOnInit();

        isMobileSelector = store.overrideSelector(getIsMobileState, false);
        isHomeSelector = store.overrideSelector(isHome, false);
        store.refreshState();
      });

      test('mobile false, not homepage', () => {
        component.headerAnimation$.subscribe((animation) => {
          expect(component.showNav).toEqual(true);
          expect(animation).toEqual(HeaderAnimationEnum.Translated);
        });
      });

      test('mobile false, homepage', () => {
        isHomeSelector.setResult(true);
        store.refreshState();

        component.headerAnimation$.subscribe((animation) => {
          expect(component.showNav).toEqual(true);
          expect(animation).toEqual(HeaderAnimationEnum.Base);
        });
      });

      test('mobile true, not homepage', () => {
        isMobileSelector.setResult(true);
        store.refreshState();

        component.headerAnimation$.subscribe((animation) => {
          expect(component.showNav).toEqual(false);
          expect(animation).toEqual(HeaderAnimationEnum.None);
        });
      });

      test('mobile true, homepage', () => {
        isMobileSelector.setResult(true);
        isHomeSelector.setResult(true);
        store.refreshState();

        component.headerAnimation$.subscribe((animation) => {
          expect(component.showNav).toEqual(true);
          expect(animation).toEqual(HeaderAnimationEnum.None);
        });
      });
    });
  });

  describe('prepareRoute', () => {
    it('should return route data', () => {
      const result = component.prepareRoute({
        activatedRouteData: { name: 'contacts' }
      } as any);

      expect(result).toEqual('contacts');
    });
  });

  describe('changeMenuAnimationState', () => {
    beforeEach(() => {
      component.menuAnimation = MenuAnimationEnum.Closed;
    });

    it('should not change menuAnimation if toState is null', () => {
      component.changeMenuAnimationState({
        phaseName: 'start',
        toState: null
      } as any);

      expect(component.menuAnimation).toEqual(MenuAnimationEnum.Closed);
    });

    it('should change menuAnimation to MenuAnimationEnum.Closed', () => {
      component.changeMenuAnimationState({
        phaseName: 'start',
        toState: PageNames.HOME
      } as any);

      expect(component.menuAnimation).toEqual(MenuAnimationEnum.Closed);
    });

    it('should change menuAnimation to MenuAnimationEnum.Open', () => {
      component.changeMenuAnimationState({
        phaseName: 'done',
        toState: PageNames.CONTACTS
      } as any);

      expect(component.menuAnimation).toEqual(MenuAnimationEnum.Open);
    });

    it('should change menuAnimation to MenuAnimationEnum.Transit', () => {
      component.changeMenuAnimationState({
        phaseName: 'start',
        fromState: PageNames.HOME,
        toState: PageNames.CONTACTS
      } as any);

      expect(component.menuAnimation).toEqual(MenuAnimationEnum.Transit);
    });

    it('should not change menuAnimation if navigating from LP to LP', () => {
      component.changeMenuAnimationState({
        phaseName: 'start',
        fromState: PageNames.EXPERIENCE,
        toState: PageNames.CONTACTS
      } as any);

      expect(component.menuAnimation).toEqual(MenuAnimationEnum.Closed);
    });

    it('should not change menuAnimation if navigating to home', () => {
      component.changeMenuAnimationState({
        phaseName: 'done',
        fromState: PageNames.EXPERIENCE,
        toState: PageNames.HOME
      } as any);

      expect(component.menuAnimation).toEqual(MenuAnimationEnum.Closed);
    });
  });
});
