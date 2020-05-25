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
import {
  TranslatePipeMock,
  TranslateServiceMock
} from '@babdev/translate-testing';

import { AppState, MockedAppStore } from '@store';
import { AppComponent } from '../app.component';

class MockRenderer {
  public addClass: jest.Mock = jest.fn();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  let renderer: Renderer2;
  const actions$: BehaviorSubject<Action> = new BehaviorSubject({ type: '' });
  const initialState: AppState = MockedAppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [AppComponent, SidebarComponent, TranslatePipeMock],
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
  });

  describe('prepareRoute', () => {
    it('should return route data', () => {
      const result = component.prepareRoute({
        activatedRouteData: { name: 'contacts' }
      } as any);

      expect(result).toEqual('contacts');
    });
  });
});
