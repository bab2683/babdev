import { htmlTag } from './tag.mock';

export class FakeDocument {
  eventMap: { [eventName: string]: Function[] } = {};
  mockEventResponse: any = {};

  head: {
    appendChild: jest.Mock;
  } = {
    appendChild: jest.fn()
  };

  addEventListener: jest.Mock = jest.fn().mockImplementation((event: string, cb: Function) => {
    if (!this.eventMap[event]) {
      this.eventMap[event] = [];
    }
    this.eventMap[event].push(cb);
  });
  createElement: jest.Mock = jest.fn().mockImplementation(() => htmlTag);
  execCommand: jest.Mock = jest.fn().mockImplementation((event: string) => {
    if (this.eventMap[event]) {
      this.eventMap[event].forEach(fn => {
        fn(this.mockEventResponse);
      });
    }
  });
  querySelector: jest.Mock = jest.fn().mockImplementation(() => htmlTag);
  removeEventListener: jest.Mock = jest.fn().mockImplementation((event: string, cb: Function) => {
    if (this.eventMap[event]) {
      this.eventMap[event] = this.eventMap[event].filter(fn => fn !== cb);
    }
  });
}
