import { Component } from '@angular/core';
import { Endpoint } from '../../../core/api/server/endpoints/endpoints.domain';
import { EndpointsService } from '../../../core/api/server/endpoints/endpoints.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent {

  readonly displayedColumns = [ 'id', 'disabled', 'description', 'action' ];

  constructor(
    private readonly endpointService: EndpointsService
  ) {
  }

  get endpoints(): Endpoint[] {
    return this.endpointService.endpoints;
  }

  public enable(id: string): void {
    this.endpointService.enable(id).subscribe();
  }

  public disable(id: string): void {
    this.endpointService.disable(id).subscribe();
  }

  trackBy(index: number, { id }: Endpoint): string {
    return id;
  }
}
