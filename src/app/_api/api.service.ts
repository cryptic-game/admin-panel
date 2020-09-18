import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly defaultHeaders: HttpHeaders;

  constructor(
    private httpClient: HttpClient
  ) {
    this.defaultHeaders = new HttpHeaders({ 'content-type': 'application/json; charset=utf-8' });
  }

  public endpoint<T>(endpoint: string, body?: object): Observable<HttpResponse<ApiResponse<T>>> {
    return this.httpClient.post<ApiResponse<T>>(`${environment.apiBaseUrl}/${endpoint}`, body, {
      headers: this.defaultHeaders,
      observe: 'response'
    });
  }
}

export interface ApiResponse<T> {
  info: {
    error: boolean,
    message?: string
  };
  data: T;
}
