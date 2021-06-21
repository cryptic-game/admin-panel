import { TestBed } from '@angular/core/testing';

import { EndpointsApiService } from './endpoints-api.service';

describe('EndpointsApiService', () => {
  let service: EndpointsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
