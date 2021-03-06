import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithBgComponent } from '../page-with-bg.component';

describe('PageWithBgComponent', () => {
  let component: PageWithBgComponent;
  let fixture: ComponentFixture<PageWithBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageWithBgComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithBgComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    component.bgData = {
      path: '/assets/contacts.jpg',
      positionY: 0,
      positionX: 50
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
