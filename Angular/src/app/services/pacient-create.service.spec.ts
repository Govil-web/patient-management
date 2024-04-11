import { TestBed } from '@angular/core/testing';

import { PacientCreateService } from './pacient-create.service';

describe('PacientCreateService', () => {
  let service: PacientCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
