import { DynamicComponentServiceMock } from '@babdev/layout-testing';
import { DocumentMock, HTMLElementMock } from '@babdev/testing';

import { CopyDirective } from './copy.directive';

describe('CopyDirective', () => {
  let directive: CopyDirective;
  let fakeDoc: DocumentMock;
  let serviceMock: DynamicComponentServiceMock;
  let valueToCopy: string;
  const host = new HTMLElementMock();
  const clipboarEventdMock = {
    clipboardData: {
      setData: jest.fn()
    },
    preventDefault: jest.fn()
  };

  beforeEach(() => {
    serviceMock = new DynamicComponentServiceMock();
    fakeDoc = new DocumentMock();
    directive = new CopyDirective(host, fakeDoc, null, serviceMock as any, null);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should call copyToClipboard method', () => {
    const spy = jest.spyOn(directive, 'copyToClipboard');

    directive.onClick();
    expect(spy).toHaveBeenCalled();
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      fakeDoc.mockEventResponse = clipboarEventdMock;
    });

    it('should copy to clipboard the initially set value', () => {
      valueToCopy = 'bla';
      directive.valueToCopy = valueToCopy;
      directive.copyToClipboard();
      expect(fakeDoc.addEventListener).toHaveBeenCalled();
      expect(clipboarEventdMock.clipboardData.setData).toHaveBeenCalledWith('text', valueToCopy);
    });

    it('should copy to clipboard the custom value', () => {
      valueToCopy = 'ble';

      directive.copyToClipboard(valueToCopy);
      expect(fakeDoc.addEventListener).toHaveBeenCalled();
      expect(clipboarEventdMock.clipboardData.setData).toHaveBeenCalledWith('text', valueToCopy);
    });

    it('should copy to clipboard the host innerText value', () => {
      valueToCopy = 'bli';
      host.nativeElement.innerText = valueToCopy;

      directive.copyToClipboard();
      expect(fakeDoc.addEventListener).toHaveBeenCalled();
      expect(clipboarEventdMock.clipboardData.setData).toHaveBeenCalledWith('text', valueToCopy);
    });
  });
});
