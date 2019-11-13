import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as rxjs from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';

import { SidebarComponent } from '../sidebar.component';
import { SidebarStatus } from '../sidebar.enum';
import * as utils from '../sidebar.utils';

@Component({
  template: ''
})
class SideNavStubComponent {
  public open = jest.fn();
  public close = jest.fn();
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let emitSpy;
  let getDirectionSpy: any;
  let determineEventSpy: any;

  let sidenavOpenSpy: any;
  let sidenavCloseSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent, SideNavStubComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    component.sidenav = TestBed.createComponent<MatSidenav>(
      SideNavStubComponent as any
    ).componentInstance;

    emitSpy = jest.spyOn(component.currentStatus, 'emit');

    sidenavCloseSpy = spyOn(component.sidenav, 'close');
    sidenavOpenSpy = spyOn(component.sidenav, 'open');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not do anything on open', () => {
    component.openedAtInit = true;
    component.ngOnInit();
    component.open();

    expect(sidenavOpenSpy).not.toHaveBeenCalled();
  });

  it('should not do anything on close', () => {
    component.ngOnInit();
    component.close();

    expect(sidenavCloseSpy).not.toHaveBeenCalled();
  });

  describe('emit status', () => {
    it('should emit SidebarStatus.OPENING', () => {
      component.ngOnInit();
      component.open();

      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.OPENING);
      expect(sidenavOpenSpy).toHaveBeenCalled();
    });

    it('should emit SidebarStatus.CLOSING', () => {
      component.openedAtInit = true;
      component.ngOnInit();
      component.close();

      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.CLOSING);
      expect(sidenavCloseSpy).toHaveBeenCalled();
    });
  });

  describe('overlay click', () => {
    it('should close the sidenav', () => {
      component.overlayClick();

      expect(emitSpy).toHaveBeenCalledWith(SidebarStatus.CLOSING);
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

        component.touchTolerance = 10;
        fixture.detectChanges();

        expect(getDirectionSpy).toHaveBeenCalled();
        expect(determineEventSpy).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalled();
      });

      it('should not open the sidebar when touch is brief', () => {
        jest
          .spyOn(rxjs, 'fromEvent')
          .mockReturnValueOnce(rxjs.of(startEvent))
          .mockReturnValueOnce(rxjs.of(moveEvent));

        component.touchTolerance = 100;
        fixture.detectChanges();

        expect(getDirectionSpy).toHaveBeenCalled();
        expect(determineEventSpy).toHaveBeenCalled();
        expect(openSpy).not.toHaveBeenCalled();
      });

      it('should close the sidebar', () => {
        jest
          .spyOn(rxjs, 'fromEvent')
          .mockReturnValueOnce(rxjs.of(moveEvent))
          .mockReturnValueOnce(rxjs.of(startEvent));

        component.touchTolerance = 10;
        fixture.detectChanges();

        expect(getDirectionSpy).toHaveBeenCalled();
        expect(determineEventSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalled();
      });
    });
  });
});
