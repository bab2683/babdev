import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Parser, ReqError, RequestData, Tester } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public get<T>(req: RequestData): Observable<T | null | ReqError> {
    return this.commonRequestHandling(this.http.get<T>(req.url), req);
  }

  public post<T>(req: RequestData): Observable<T | null | ReqError> {
    return this.commonRequestHandling(this.http.post<T>(req.url, req.body), req);
  }

  public put<T>(req: RequestData): Observable<T | null | ReqError> {
    return this.commonRequestHandling(this.http.put<T>(req.url, req.body), req);
  }

  public delete<T>(req: RequestData): Observable<T | null | ReqError> {
    return this.commonRequestHandling(this.http.delete<T>(req.url), req);
  }

  private commonRequestHandling<T>(
    req: Observable<any>,
    { parser, tester }: RequestData
  ): Observable<T | null | ReqError> {
    return req.pipe(
      map(result => this.requestResultParser<T>({ result, parser, tester })),
      catchError(this.handleResponseError)
    );
  }

  private requestResultParser<T>({
    result,
    parser,
    tester
  }: {
    result: T;
    parser: Parser;
    tester: Tester;
  }): T | null {
    if (tester) {
      return tester(result) ? this.parseResult<T>(parser, result) : null;
    }
    return this.parseResult<T>(parser, result);
  }

  private parseResult<T>(parser: Parser, result: T): T {
    return parser ? parser(result) : result;
  }

  private handleResponseError(err: HttpErrorResponse): Observable<ReqError> {
    return of({ error: err.error.code, status: err.status });
  }
}
