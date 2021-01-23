import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {AccountService} from '../_core/account/account.service';
import {DEFAULT_HEADERS} from './api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly accountService: AccountService,
    private readonly httpClient: HttpClient
  ) {
  }

  private static handleError(endpoint: string, errorResponse: HttpErrorResponse): HttpErrorResponse {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', errorResponse.error.message);
    } else if (errorResponse.status) {
      console.warn(`Error from server at endpoint ${endpoint}: ${errorResponse.status} ${errorResponse.statusText}`
        + `- ${errorResponse.error?.error}`);
    } else {
      console.error(errorResponse);
    }

    return errorResponse;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public endpoint<T>(endpoint: string, body?: object): Observable<HttpResponse<T>> {
    if (this.accountService.expired) {
      return this.accountService.refreshAccessToken()
      .pipe(switchMap(() => this.endpoint0<T>(endpoint, body)));
    }
    return this.endpoint0<T>(endpoint, body);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private endpoint0<T>(endpoint: string, body?: object): Observable<HttpResponse<T>> {
    const response0 = body
      ? this.httpClient.post<T>(`${environment.apiBaseUrl}/${endpoint}`, body,
        {headers: DEFAULT_HEADERS, observe: 'response'})
      : this.httpClient.get<T>(`${environment.apiBaseUrl}/${endpoint}`,
        {headers: DEFAULT_HEADERS, observe: 'response'});

    return response0.pipe(
      tap(response => {
        // @ts-ignore
        if (response.body.error) {
          throwError(response);
        }
      }),
      catchError(errorResponse => {
        throw ApiService.handleError(endpoint, errorResponse);
      })
    );
  }
}
