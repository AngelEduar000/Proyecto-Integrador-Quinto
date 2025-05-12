import { TestBed } from '@angular/core/testing';

import { FirabaseAuthService } from './firabase-auth.service';

describe('FirabaseAuthService', () => {
  let service: FirabaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirabaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
