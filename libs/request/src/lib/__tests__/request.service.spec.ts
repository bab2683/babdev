import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Parser, Tester } from '../request.model';
import { RequestService } from '../request.service';

class HttpClientMock {
  get = jest.fn().mockReturnValue(of(null));
  post = jest.fn().mockReturnValue(of(null));
  put = jest.fn().mockReturnValue(of(null));
  delete = jest.fn().mockReturnValue(of(null));
}

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpClientMock;
  const testUrl: string = '/test/url';

  beforeEach(() => {
    httpMock = new HttpClientMock();
    service = new RequestService(httpMock as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should make the request', () => {
      service.get({ url: testUrl }).subscribe(() => {
        expect(httpMock.get).toHaveBeenCalledWith(testUrl);
      });
    });

    it('should parse the response', () => {
      httpMock.get.mockReturnValueOnce(of([1, 2, 3]));
      const parser: Parser = value => value * 2;

      service.get({ url: testUrl, parser }).subscribe(({ data }) => {
        expect(data).toEqual([2, 4, 6]);
      });
    });

    it('should return null when condition fails', () => {
      httpMock.get.mockReturnValueOnce(of(3));
      const tester: Tester = value => value % 2 === 0;

      service.get({ url: testUrl, tester }).subscribe(({ data }) => {
        expect(data).toEqual(null);
      });
    });

    it('should return the value when condition passes', () => {
      httpMock.get.mockReturnValueOnce(of(2));
      const tester: Tester = value => value % 2 === 0;

      service.get({ url: testUrl, tester }).subscribe(({ data }) => {
        expect(data).toEqual(2);
      });
    });

    it('should return the cached value when cache is set to true', () => {
      httpMock.get.mockReturnValueOnce(of('my cache test'));

      service
        .get({ url: testUrl, cache: true })
        .pipe(take(1))
        .subscribe(() => {
          expect(httpMock.get).toHaveBeenCalled();
        });

      service
        .get({ url: testUrl, cache: true })
        .pipe(take(1))
        .subscribe(() => {
          expect(httpMock.get).not.toHaveBeenCalled();
        });
    });

    it('should return an error', () => {
      const mockErrorResponse = { status: 409 };

      httpMock.get.mockReturnValueOnce(
        of([1, 2, 3]).pipe(
          tap(() => {
            throw mockErrorResponse;
          })
        )
      );

      service.get({ url: testUrl }).subscribe(({ err }) => {
        expect(err).toEqual({ status: 409 });
      });
    });
  });

  describe('post', () => {
    it('should make the request', () => {
      service.post({ url: testUrl }).subscribe(() => {
        expect(httpMock.post).toHaveBeenCalledWith(testUrl);
      });
    });
  });

  describe('put', () => {
    it('should make the request', () => {
      service.put({ url: testUrl }).subscribe(() => {
        expect(httpMock.put).toHaveBeenCalledWith(testUrl);
      });
    });
  });

  describe('delete', () => {
    it('should make the request', () => {
      service.delete({ url: testUrl }).subscribe(() => {
        expect(httpMock.delete).toHaveBeenCalledWith(testUrl);
      });
    });
  });
});
