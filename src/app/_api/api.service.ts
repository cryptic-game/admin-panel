import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private defaultHeaders: HttpHeaders;

  constructor(
    private httpClient: HttpClient
  ) {
    this.defaultHeaders = new HttpHeaders({ 'content-type': 'application/json; charset=utf-8' });
  }

  private static handleError(endpoint: string, errorResponse: HttpErrorResponse): HttpErrorResponse {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', errorResponse.error.message);
    } else if (errorResponse.status) {
      console.warn(`Error from server at endpoint ${endpoint}: ${errorResponse.status} ${errorResponse.statusText} - ${errorResponse.error?.error}`);
    } else {
      console.error(errorResponse);
    }

    return errorResponse;
  }

  public endpoint<T>(endpoint: string, body?: object): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(`${environment.apiBaseUrl}/${endpoint}`, body, {
      headers: this.defaultHeaders,
      observe: 'response'
    }).pipe(
      tap(response => {
        // @ts-ignore
        if (response.body.error) {
          // @ts-ignore
          throwError(response);
        }
      }),
      catchError(errorResponse => {
        throw ApiService.handleError(endpoint, errorResponse);
      })
    );
  }
}
