import { TestBed } from '@angular/core/testing';

import { MostrarBrigadaService } from './mostrar-brigada.service';

describe('MostrarBrigadaService', () => {
  let service: MostrarBrigadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarBrigadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
