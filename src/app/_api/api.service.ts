import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  public endpoint<T>(endpoint: string, body?: object): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(`${environment.apiBaseUrl}/${endpoint}`, body, {
      headers: this.defaultHeaders,
      observe: 'response'
    }).pipe(tap(response => {
      // @ts-ignore
      if (response.body.error) {
        // @ts-ignore
        throwError(response.body.error);
      }
    }));
  }
}
