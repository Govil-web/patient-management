import { TestBed } from '@angular/core/testing';

import { ListarConsultasService } from './listar-consultas.service';

describe('ListarConsultasService', () => {
  let service: ListarConsultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarConsultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
