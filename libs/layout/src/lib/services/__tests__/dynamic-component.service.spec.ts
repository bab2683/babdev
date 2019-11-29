import { TestBed } from '@angular/core/testing';
import {
  ComponentFactoryResolverMock,
  HTMLElementMock,
  ViewContainerRefMock
} from '@babdev/testing';

import { DynamicComponentService } from '../dynamic-component.service';

describe('DynamicComponentService', () => {
  let service: DynamicComponentService;
  let factoryMock: ComponentFactoryResolverMock;
  let viewRefMock: ViewContainerRefMock;

  beforeEach(() => {
    factoryMock = new ComponentFactoryResolverMock();
    viewRefMock = new ViewContainerRefMock();
    service = new DynamicComponentService(factoryMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addComponentToRef', () => {
    it('should return the new component', () => {
      const fakeEl: HTMLElementMock = new HTMLElementMock();
      viewRefMock.setReturnComponent(fakeEl);

      const result: any = service.addComponentToRef(HTMLElementMock, viewRefMock as any);
      expect(result.instance).toEqual(fakeEl);
    });

    it('should return the new component with new options', () => {
      const fakeEl: HTMLElementMock = new HTMLElementMock();
      viewRefMock.setReturnComponent(fakeEl);

      const result: any = service.addComponentToRef(HTMLElementMock, viewRefMock as any, {
        test: true
      });

      expect(result.instance).toHaveProperty('test');
    });

    it('should return the new component when lazy loaded', () => {
      const fakeEl: HTMLElementMock = new HTMLElementMock();
      viewRefMock.setReturnComponent(fakeEl);

      const result: any = service.addComponentToRef(HTMLElementMock, viewRefMock as any, null, {
        componentFactoryResolver: factoryMock
      } as any);
      expect(result.instance).toEqual(fakeEl);
    });
  });
});
