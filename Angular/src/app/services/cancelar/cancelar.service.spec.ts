import { TestBed } from '@angular/core/testing';

import { CancelarService } from './cancelar.service';

describe('CancelarService', () => {
  let service: CancelarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
