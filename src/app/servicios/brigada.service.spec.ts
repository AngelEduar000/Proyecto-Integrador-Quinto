import { TestBed } from '@angular/core/testing';

import { BrigadaService } from './brigada.service';

describe('BrigadaService', () => {
  let service: BrigadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrigadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
