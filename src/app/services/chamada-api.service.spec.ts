import { TestBed } from '@angular/core/testing';

import { ChamadaAPIService } from './chamada-api.service';

describe('ChamadaAPIService', () => {
  let service: ChamadaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
