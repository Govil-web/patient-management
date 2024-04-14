import { TestBed } from '@angular/core/testing';

import { DoctorCreateService } from './doctor-create.service';

describe('DoctorCreateService', () => {
  let service: DoctorCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
