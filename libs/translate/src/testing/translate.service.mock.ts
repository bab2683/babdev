export class TranslateServiceMock {
  public getKey: jest.Mock<any> = jest.fn();
  public changeActiveLanguage: jest.Mock<any> = jest.fn();
  public loadDictionary: jest.Mock<any> = jest.fn();
}
