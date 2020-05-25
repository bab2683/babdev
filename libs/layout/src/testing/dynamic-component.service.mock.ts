export class DynamicComponentServiceMock {
  public addComponentToRef: jest.Mock = jest
    .fn()
    .mockReturnValue({ instance: { show: jest.fn() } });
}
