import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCitasComponent } from './listar-citas.component';

describe('ListarCitasComponent', () => {
  let component: ListarCitasComponent;
  let fixture: ComponentFixture<ListarCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarCitasComponent]
    });
    fixture = TestBed.createComponent(ListarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
