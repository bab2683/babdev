export class RequestServiceMock {
  get: jest.Mock<any> = jest.fn();
  post: jest.Mock<any> = jest.fn();
  put: jest.Mock<any> = jest.fn();
  delete: jest.Mock<any> = jest.fn();
}
