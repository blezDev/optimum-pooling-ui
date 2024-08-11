import { TestBed } from '@angular/core/testing';

import { RidesearchService } from './ridesearch.service';

describe('RidesearchService', () => {
  let service: RidesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
