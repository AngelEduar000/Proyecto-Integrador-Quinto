import { TestBed } from '@angular/core/testing';

import { BrigadistaService } from './brigadista.service';

describe('BrigadistaService', () => {
  let service: BrigadistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrigadistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
