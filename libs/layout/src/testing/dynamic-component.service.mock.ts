export class DynamicComponentServiceMock {
  addComponentToRef: jest.Mock = jest.fn().mockReturnValue({ instance: { show: jest.fn() } });
}
