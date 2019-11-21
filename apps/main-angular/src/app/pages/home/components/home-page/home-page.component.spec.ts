import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@babdev/translate';
import { TranslatePipeMock, TranslateServiceMock } from '@babdev/translate-testing';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, TranslatePipeMock],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
