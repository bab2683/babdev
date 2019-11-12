import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as rxjs from 'rxjs';

import { SidebarComponent } from '../sidebar.component';
import { SidebarStatus } from '../sidebar.enum';
import * as utils from '../sidebar.utils';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let emitSpy;
  let getDirectionSpy: any;
  let determineEventSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    emitSpy = jest.spyOn(component.currentStatus, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit only initial value', () => {
    component.initialState = SidebarStatus.OPEN;

    fixture.detectChanges();
    component.open();
    expect(emitSpy.mock.calls).toMatchSnapshot();
  });

  describe('emit status', () => {
    it('should emit SidebarStatus.OPENING', () => {
      fixture.detectChanges();
      component.open();
      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.OPENING);
    });

    it('should emit SidebarStatus.CLOSING', () => {
      component.initialState = SidebarStatus.OPEN;
      fixture.detectChanges();
      component.close();

      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.CLOSING);
    });
  });

  describe('animationComplete', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should change the status to OPEN once OPENING is done', () => {
      component.animationComplete({ toState: SidebarStatus.OPENING } as any);

      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.OPEN);
    });

    it('should change the status to CLOSE once CLOSING is done', () => {
      component.animationComplete({ toState: SidebarStatus.CLOSING } as any);

      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.CLOSE);
    });
  });

  describe('touch events', () => {
    it('should not attach touch events', () => {
      component.withTouch = false;
      const combineLatestSpy = jest.spyOn(rxjs, 'combineLatest');

      fixture.detectChanges();

      expect(combineLatestSpy).not.toHaveBeenCalled();
    });

    describe('with events', () => {
      let startEvent: any;
      let moveEvent: any;
      let openSpy: any;
      let closeSpy: any;

      beforeEach(() => {
        getDirectionSpy = jest.spyOn(utils, 'getTouchDirection');
        determineEventSpy = jest.spyOn(utils, 'determineEvent');
        openSpy = jest.spyOn(component, 'open');
        closeSpy = jest.spyOn(component, 'close');
        startEvent = { touches: [{ clientX: 0 }] };
        moveEvent = { touches: [{ clientX: 20 }] };
      });

      it('should open the sidebar', () => {
        jest
          .spyOn(rxjs, 'fromEvent')
          .mockReturnValueOnce(rxjs.of(startEvent))
          .mockReturnValueOnce(rxjs.of(moveEvent));

        fixture.detectChanges();

        expect(getDirectionSpy).toHaveBeenCalled();
        expect(determineEventSpy).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalled();
      });

      it('should close the sidebar', () => {
        jest
          .spyOn(rxjs, 'fromEvent')
          .mockReturnValueOnce(rxjs.of(moveEvent))
          .mockReturnValueOnce(rxjs.of(startEvent));

        fixture.detectChanges();

        expect(getDirectionSpy).toHaveBeenCalled();
        expect(determineEventSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalled();
      });
    });
  });
});
