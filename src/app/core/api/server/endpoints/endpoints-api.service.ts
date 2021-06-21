import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from './endpoints.domain';
import { environment } from '../../../../../environments/environment';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EndpointsApiService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public findEndpoints(): Observable<Endpoint[]> {
    return this.http.get<{ [name: string]: Endpoint }>(`${environment.api}/server/endpoints`, { withCredentials: true })
      .pipe(map(data => Object.values(data)), take(1));
  }

  public enable(id: string): Observable<Endpoint> {
    console.log(`${environment.api}/server/endpoints/${encodeURIComponent(id)}`);
    return this.http.delete<Endpoint>(`${environment.api}/server/endpoints/${encodeURIComponent(id)}`, { withCredentials: true })
      .pipe(take(1));
  }

  public disable(id: string): Observable<Endpoint> {
    console.log(`${environment.api}/server/endpoints/${encodeURIComponent(id)}`);
    return this.http.post<Endpoint>(`${environment.api}/server/endpoints/${encodeURIComponent(id)}`, null, { withCredentials: true })
      .pipe(take(1));
  }
}
