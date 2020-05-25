import { htmlTag } from './tag.mock';

export class DocumentMock {
  public eventMap: { [eventName: string]: Function[] } = {};
  public mockEventResponse: any = {};

  public head: {
    appendChild: jest.Mock;
  } = {
    appendChild: jest.fn()
  };

  public addEventListener: jest.Mock = jest
    .fn()
    .mockImplementation((event: string, cb: Function) => {
      if (!this.eventMap[event]) {
        this.eventMap[event] = [];
      }
      this.eventMap[event].push(cb);
    });
  public createElement: jest.Mock = jest.fn().mockImplementation(() => htmlTag);
  public execCommand: jest.Mock = jest
    .fn()
    .mockImplementation((event: string) => {
      if (this.eventMap[event]) {
        this.eventMap[event].forEach((fn) => {
          fn(this.mockEventResponse);
        });
      }
    });
  public querySelector: jest.Mock = jest.fn().mockImplementation(() => htmlTag);
  public removeEventListener: jest.Mock = jest
    .fn()
    .mockImplementation((event: string, cb: Function) => {
      if (this.eventMap[event]) {
        this.eventMap[event] = this.eventMap[event].filter((fn) => fn !== cb);
      }
    });
}
