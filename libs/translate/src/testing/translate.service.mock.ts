export class TranslateServiceMock {
  getKey: jest.Mock<any> = jest.fn();
  changeActiveLanguage: jest.Mock<any> = jest.fn();
  loadDictionary: jest.Mock<any> = jest.fn();
}
