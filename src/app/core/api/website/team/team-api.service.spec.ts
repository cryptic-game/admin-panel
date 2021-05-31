import { TestBed } from '@angular/core/testing';

import { TeamApiService } from './team-api.service';

describe('TeamApiService', () => {
  let service: TeamApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
