import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMailComponent } from '../button-mail.component';

describe('ButtonMailComponent', () => {
  let component: ButtonMailComponent;
  let fixture: ComponentFixture<ButtonMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonMailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
