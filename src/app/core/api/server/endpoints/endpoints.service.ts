import { Injectable } from '@angular/core';
import { Endpoint } from './endpoints.domain';
import { EndpointsApiService } from './endpoints-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private endpoints0?: Endpoint[];

  constructor(
    private readonly endpointsApi: EndpointsApiService
  ) {
    this.updateCache();
  }

  get endpoints(): Endpoint[] {
    return this.endpoints0 || [];
  }

  public enable(id: string): Observable<Endpoint> {
    return this.endpointsApi.enable(id)
      .pipe(tap(endpoint => this.handleResponse(endpoint)));
  }

  public disable(id: string): Observable<Endpoint> {
    return this.endpointsApi.disable(id)
      .pipe(tap(endpoint => this.handleResponse(endpoint)));
  }

  private handleResponse(endpoint: Endpoint): void {
    const local = this.endpoints0?.find(e => e.id === endpoint.id);

    if (local) {
      local.description = endpoint.description;
      local.disabled = endpoint.disabled;
    }
    else {
      this.endpoints0?.push(endpoint);
    }
  }

  private updateCache(): void {
    this.endpointsApi.findEndpoints()
      .subscribe(endpoints => this.endpoints0 = endpoints.sort((a,b) => ('' + a.id).localeCompare(b.id)));
  }
}
