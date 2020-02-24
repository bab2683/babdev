import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipeMock } from '@babdev/translate-testing';

import { TooltipStatus } from '../../../enums';
import { TooltipComponent } from '../tooltip.component';

@Component({
  template: ''
})
class MatTooltipStubComponent {
  public show = jest.fn();
  public hide = jest.fn();
}

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let tooltipShowSpy: any;
  let tooltipHideSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent, MatTooltipStubComponent, TranslatePipeMock],
      imports: [MatTooltipModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;

    component.tooltip = TestBed.createComponent<MatTooltip>(
      MatTooltipStubComponent as any
    ).componentInstance;

    tooltipShowSpy = jest.spyOn(component.tooltip, 'show');
    tooltipHideSpy = jest.spyOn(component.tooltip, 'hide');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  describe('tooltip hide', () => {
    it('should hide the tooltip', () => {
      component.status = TooltipStatus.OPEN;
      component.hide();
      expect(tooltipHideSpy).toHaveBeenCalled();
    });

    it('should not call matTooltip hide if already closed', () => {
      component.hide();
      expect(tooltipHideSpy).not.toHaveBeenCalled();
    });
  });

  describe('tooltip show', () => {
    beforeEach(() => {
      component.status = TooltipStatus.CLOSED;
    });

    it('should call matTooltip show function', () => {
      component.show();
      expect(component.status).toEqual(TooltipStatus.OPEN);
      expect(tooltipShowSpy).toHaveBeenCalled();
    });

    it('should not call matTooltip show when already open', () => {
      component.status = TooltipStatus.OPEN;
      component.show();
      expect(tooltipShowSpy).not.toHaveBeenCalled();
    });

    it('should call matTooltip show function with auto closing', () => {
      jest.useFakeTimers();
      const timerDuration: number = 50;
      component.show(timerDuration);
      expect(tooltipShowSpy).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timerDuration);
      jest.advanceTimersByTime(timerDuration + 1);
      expect(tooltipHideSpy).toHaveBeenCalled();
    });
  });
});
