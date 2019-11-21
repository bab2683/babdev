import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@babdev/translate';
import { TranslatePipeMock, TranslateServiceMock } from '@babdev/translate-testing';

import { AppComponent } from '../app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [AppComponent, TranslatePipeMock],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
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
});
