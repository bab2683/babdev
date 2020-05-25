import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HTMLElementMock } from '@babdev/testing';

import { ButtonCopyComponent } from '../button-copy.component';

describe('ButtonCopyComponent', () => {
  let component: ButtonCopyComponent;
  let fixture: ComponentFixture<ButtonCopyComponent>;
  let blurSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCopyComponent, HTMLElementMock],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCopyComponent);
    component = fixture.componentInstance;

    component.button = TestBed.createComponent<any>(
      HTMLElementMock
    ).componentInstance;

    blurSpy = jest.spyOn(component.button.nativeElement, 'blur');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should remove the focus from element', () => {
    component.removeFocus();
    expect(blurSpy).toHaveBeenCalled();
  });
});
