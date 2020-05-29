import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TranslatePipeMock } from '@babdev/translate-testing';

import { AppState, GLOBAL_FEATURE, ROUTER_FEATURE } from '@store';
import { ContactsPageComponent } from '../contacts-page.component';

describe('ContactsPageComponent', () => {
  let component: ContactsPageComponent;
  let fixture: ComponentFixture<ContactsPageComponent>;
  let store: MockStore<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsPageComponent, TranslatePipeMock],
      providers: [
        provideMockStore({
          initialState: {
            [GLOBAL_FEATURE]: { isMobile: false },
            [ROUTER_FEATURE]: {}
          }
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<Store<AppState>>(Store) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
