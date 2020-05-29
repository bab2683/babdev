import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  BackGroundPositionXEnum,
  BackGroundPositionYEnum,
  HorizontalContentAlignmentEnum
} from '../../../enums';
import { BgComponent } from '../bg.component';

describe('BgComponent', () => {
  let component: BgComponent;
  let fixture: ComponentFixture<BgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should put the background', () => {
    component.data = {
      path: '/assets/contacts.jpg',
      positionY: BackGroundPositionYEnum.BOTTOM,
      positionX: 50
    };

    component.ngOnChanges({
      data: new SimpleChange(null, component.data, false)
    });

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(component.positionX).toEqual('50%');
    expect(component.positionY).toEqual(BackGroundPositionYEnum.BOTTOM);
  });

  it('should use the default values the background', () => {
    component.data = {
      path: '/assets/contacts.jpg'
    };

    component.ngOnChanges({
      data: new SimpleChange(null, component.data, false)
    });

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(component.positionX).toEqual(BackGroundPositionXEnum.CENTER);
    expect(component.positionY).toEqual('0%');
  });

  it('should not load the background', () => {
    component.horizontalContentAlignment = HorizontalContentAlignmentEnum.LEFT;

    component.ngOnChanges({
      horizontalContentAlignment: new SimpleChange(
        null,
        component.horizontalContentAlignment,
        true
      )
    });

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
