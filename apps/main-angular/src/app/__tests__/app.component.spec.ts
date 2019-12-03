import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@babdev/translate';
import { TranslatePipeMock, TranslateServiceMock } from '@babdev/translate-testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState, MockedAppStore } from '@store';

import { AppComponent } from '../app.component';

class MockRenderer {
  addClass: jest.Mock = jest.fn();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  const initialState: AppState = MockedAppStore;
  let renderer: Renderer2;

  // beforeEach(() => {
  //   renderer = new MockRenderer();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [AppComponent, TranslatePipeMock],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock
        },
        provideMockStore({ initialState }),
        Renderer2
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.get<Store<AppState>>(Store);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);

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

  it('should assing the global class', () => {
    store.setState({ global: { isMobile: false } });
    component.ngOnInit();

    expect(component.isMobile).toEqual(false);
    expect(renderer.addClass).toHaveBeenCalled();
  });

  it('should not assing the global class', () => {
    store.setState({ global: { isMobile: true } });
    component.ngOnInit();

    expect(component.isMobile).toEqual(true);
    expect(renderer.addClass).not.toHaveBeenCalled();
  });
});
