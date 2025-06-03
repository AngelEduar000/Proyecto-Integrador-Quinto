import { TestBed } from '@angular/core/testing';

import { investigacionService } from './investigacion.service';

describe('ConglomeradonSubparcelasService', () => {
  let service: investigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(investigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
