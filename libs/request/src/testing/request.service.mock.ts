export class RequestServiceMock {
  public get: jest.Mock<any> = jest.fn();
  public post: jest.Mock<any> = jest.fn();
  public put: jest.Mock<any> = jest.fn();
  public delete: jest.Mock<any> = jest.fn();
}
