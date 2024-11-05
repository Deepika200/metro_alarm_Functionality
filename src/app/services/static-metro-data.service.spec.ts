import { TestBed } from '@angular/core/testing';

import { StaticMetroDataService } from './static-metro-data.service';

describe('StaticMetroDataService', () => {
  let service: StaticMetroDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticMetroDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
