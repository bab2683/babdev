import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Parser, RequestData, RequestResponse } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  cache: { [url: string]: any } = {};

  constructor(private http: HttpClient) {}

  public get<T>(req: RequestData): Observable<RequestResponse<T>> {
    return this.commonRequestHandling(this.http.get<T>(req.url), req);
  }

  public post<T>(req: RequestData): Observable<RequestResponse<T>> {
    return this.commonRequestHandling(this.http.post<T>(req.url, req.body), req);
  }

  public put<T>(req: RequestData): Observable<RequestResponse<T>> {
    return this.commonRequestHandling(this.http.put<T>(req.url, req.body), req);
  }

  public delete<T>(req: RequestData): Observable<RequestResponse<T>> {
    return this.commonRequestHandling(this.http.delete<T>(req.url), req);
  }

  private commonRequestHandling<T>(
    req: Observable<any>,
    reqData: RequestData
  ): Observable<RequestResponse<T>> {
    return reqData.cache && this.cache[reqData.url]
      ? of({ data: this.cache[reqData.url] })
      : req.pipe(
          map<any, RequestResponse<T>>(result => ({
            data: this.requestResultParser<T>(result, reqData)
          })),
          catchError(this.handleResponseError)
        );
  }

  private requestResultParser<T>(result: T, { cache, parser, tester, url }: RequestData): T | null {
    if (tester) {
      return tester(result) ? this.parseResult<T>(parser, result) : null;
    }

    const parsedResult: any = this.parseResult<T>(parser, result);
    if (cache) {
      this.cache[url] = parsedResult;
    }

    return parsedResult;
  }

  private parseResult<T>(parser: Parser, result: T): T {
    return parser ? parser(result) : result;
  }

  private handleResponseError<T>(err: HttpErrorResponse): Observable<RequestResponse<T>> {
    return of({ data: null, err: { error: err.error.code, status: err.status } });
  }
}
